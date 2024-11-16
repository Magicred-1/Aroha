// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";
import { USDC } from "../contracts/mocks/MockUSDC.sol";

contract DeployUSDC is Script, ChainConfigs {
    function run() external {
        // Load private key from .env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        ChainConfig memory chainConfig = chainConfigs[1301];
        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == 1301, "Wrong chain");

        console.log("\n=== Deploying to %s ===", chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);
        address deployer = vm.addr(privateKey);

        USDC usdc = new USDC(deployer);

        console.log("Token deployed at:", address(usdc));
        console.log("Chain ID:", block.chainid);

        usdc.mint(deployer, 1000000000000000000000000);
        console.log("Minted to deployer:", 1000000000000000000000000);

        vm.stopBroadcast();
    }
}
