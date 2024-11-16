// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { AhoraTrade } from "../contracts/AhoraTrade.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";

contract DeployUnichain is Script, ChainConfigs {
    constructor() {}

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

        AhoraTrade ahora = new AhoraTrade(
            chainConfig.lzEndpoint,
            deployer,
            address(0x2880aB155794e7179c9eE2e38200202908C17B43)
        );

        console.log("Token deployed at:", address(ahora));
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
