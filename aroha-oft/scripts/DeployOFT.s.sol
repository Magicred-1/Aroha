// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { Constants } from "../contracts/Constants.sol";
import { MyOFT } from "../contracts/MyOFT.sol";
import { OFTPairConfig } from "./OFTPairConfig.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";

contract DeployOFT is Script, Constants, ChainConfigs {
    bytes32 constant SALT = bytes32(uint256(1));

    function run() external {
        // Load private key from .env
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        OFTPairConfig.TokenConfig[] memory pairs = OFTPairConfig.getTokenPairs();

        for (uint i = 0; i < pairs.length; i++) {
            OFTPairConfig.TokenConfig memory pair = pairs[i];

            // Deploy on Unichain
            deployOnChain(pair, pair.unichainId, i, deployerPrivateKey);

            // Deploy on remote chain
            deployOnChain(pair, pair.remoteChainId, i, deployerPrivateKey);
        }
    }

    function deployOnChain(
        OFTPairConfig.TokenConfig memory config,
        uint256 chainId,
        uint256 pairIndex,
        uint256 privateKey
    ) internal {
        ChainConfig memory chainConfig = chainConfigs[chainId];

        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == chainId, "Wrong chain");

        console.log("\n=== Deploying %s to %s ===", config.name, chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);
        address deployer = vm.addr(privateKey);

        // Calculate deterministic salt for this pair
        bytes32 salt = keccak256(abi.encodePacked(SALT, pairIndex));

        // Deploy the contract using CREATE2
        MyOFT oft = new MyOFT{ salt: salt }(config.name, config.symbol, chainConfig.lzEndpoint, deployer);

        console.log("OFT deployed at:", address(oft));
        console.log("Chain ID:", chainId);
        console.log("LZ Endpoint:", chainConfig.lzEndpoint);

        vm.stopBroadcast();
    }
}
