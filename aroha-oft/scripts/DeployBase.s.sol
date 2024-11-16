// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { DestinationOApp } from "../contracts/DestinationOApp.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";
import { DeploymentConstants } from "./DeploymentConstants.sol";

contract DeployBase is Script, ChainConfigs, DeploymentConstants {
    constructor() {}

    function run() external {
        // Load private key from .env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        ChainConfig memory chainConfig = chainConfigs[534351];
        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == 534351, "Wrong chain");

        console.log("\n=== Deploying to %s ===", chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);
        address deployer = vm.addr(privateKey);

        DestinationOApp destination = new DestinationOApp(chainConfig.lzEndpoint, deployer);
        destination.registerToken(BLB01_SCROLL);

        console.log("Token deployed at:", address(destination));
        console.log("Chain ID:", block.chainid);
        console.log("LZ Endpoint:", chainConfig.lzEndpoint);

        vm.stopBroadcast();
    }

    // Helper function to verify contracts after deployment
    function verify(address contractAddress, bytes memory constructorArgs) internal {
        // This is a placeholder for contract verification logic
        // Implementation will depend on the block explorer API
    }
}
