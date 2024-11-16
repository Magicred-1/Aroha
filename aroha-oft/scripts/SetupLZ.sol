// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { ChainConfigs } from "./ChainConfigs.sol";
import { console } from "forge-std/console.sol";
import { AhoraTrade } from "../contracts/AhoraTrade.sol";
import { DestinationOApp } from "../contracts/DestinationOApp.sol";
import { DeploymentConstants } from "./DeploymentConstants.sol";
import { ERC20Fund } from "../contracts/ERC20Fund.sol";
import { ILayerZeroEndpointV2 } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroEndpointV2.sol";

contract SetupLz is Script, ChainConfigs, DeploymentConstants {
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
        // Initialize the endpoint contract
        ILayerZeroEndpointV2 endpoint = ILayerZeroEndpointV2(chainConfig.lzEndpoint);

        // Set the send library
        endpoint.setSendLibrary(AHORA, baseId, 0x72e34F44Eb09058bdDaf1aeEebDEC062f1844b00);
        console.log("Send library set successfully.");

        // Set the receive library
        endpoint.setReceiveLibrary(AHORA, baseId, 0xbEA34F26b6FBA63054e4eD86806adce594A62561, 0);
        console.log("Receive library set successfully.");

        vm.stopBroadcast();

        chainConfig = chainConfigs[84532];
        // Create fork for this chain
        vm.createSelectFork(vm.envString(chainConfig.rpcUrl));

        // Verify we're on the right chain
        require(block.chainid == 84532, "Wrong chain");

        console.log("\n=== Working on %s ===", chainConfig.name);

        // Start broadcast with the private key
        vm.startBroadcast(privateKey);

        endpoint = ILayerZeroEndpointV2(chainConfig.lzEndpoint);

        // Set the send library
        endpoint.setSendLibrary(BASE_OAPP, ahoraId, 0x72e34F44Eb09058bdDaf1aeEebDEC062f1844b00);
        console.log("Send library set successfully.");

        // Set the receive library
        endpoint.setReceiveLibrary(BASE_OAPP, ahoraId, 0xbEA34F26b6FBA63054e4eD86806adce594A62561, 0);
        console.log("Receive library set successfully.");

        vm.stopBroadcast();
    }
}
