// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";
import { AhoraTrade } from "../contracts/AhoraTrade.sol";
import { DestinationOApp } from "../contracts/DestinationOApp.sol";
import { DeploymentConstants } from "./DeploymentConstants.sol";
import { ERC20Fund } from "../contracts/ERC20Fund.sol";

contract SetupAhora is Script, ChainConfigs, DeploymentConstants {
    function addressToBytes32(address _addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function run() external {
        // Load private key from .env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        ChainConfig memory chainConfig = chainConfigs[1301];
        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == 1301, "Wrong chain");

        console.log("\n=== Working on %s ===", chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);
        address deployer = vm.addr(privateKey);

        AhoraTrade ahora = AhoraTrade(AHORA);
        ahora.addSupportedToken(USDTBL_UNICHAIN);
        ahora.setPriceFeedId(USDTBL_UNICHAIN, BASE_PRICE_FEED_ID);
        ahora.setDestinationChainEids(USDTBL_UNICHAIN, baseId);
        ahora.setPeer(baseId, addressToBytes32(BASE_OAPP));

        ERC20Fund unichainToken = ERC20Fund(USDTBL_UNICHAIN);
        unichainToken.grantRole(unichainToken.MINTER_ROLE(), address(ahora));
        unichainToken.grantRole(unichainToken.BURNER_ROLE(), address(ahora));

        vm.stopBroadcast();

        chainConfig = chainConfigs[84532];
        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == 84532, "Wrong chain");

        console.log("\n=== Working on %s ===", chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);

        DestinationOApp destination = DestinationOApp(BASE_OAPP);
        destination.setPeer(ahoraId, addressToBytes32(AHORA));

        ERC20Fund baseToken = ERC20Fund(USDTBL_BASE);
        baseToken.grantRole(baseToken.MINTER_ROLE(), address(destination));
        baseToken.grantRole(baseToken.BURNER_ROLE(), address(destination));

        vm.stopBroadcast();
    }
}
