// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Script } from "forge-std/Script.sol";
import { Constants } from "../contracts/Constants.sol";
import { Ahora } from "../contracts/Ahora.sol";

contract DeployScript is Script, Constants {
    // Chain-specific configurations
    struct ChainConfig {
        string rpcUrl;
        string name;
    }

    // Mapping of chain IDs to their configurations
    mapping(uint256 => ChainConfig) public chainConfigs;
    uint256[] public chainIds;

    constructor() {
        // Rootstock Testnet
        chainConfigs[31] = ChainConfig({ rpcUrl: "ROOTSTOCK_TESTNET_RPC_URL", name: "Rootstock Testnet" });
        chainIds.push(31);

        // Polygon Amoy Testnet
        chainConfigs[80002] = ChainConfig({ rpcUrl: "POLYGON_AMOY_RPC_URL", name: "Polygon Amoy" });
        chainIds.push(80002);

        // Unichain Sepolia
        chainConfigs[1301] = ChainConfig({ rpcUrl: "UNICHAIN_SEPOLIA_RPC_URL", name: "Unichain Sepolia" });
        chainIds.push(1301);

        // Linea Sepolia
        chainConfigs[59141] = ChainConfig({ rpcUrl: "LINEA_SEPOLIA_RPC_URL", name: "Linea Sepolia" });
        chainIds.push(59141);

        // Hedera Testnet
        chainConfigs[296] = ChainConfig({ rpcUrl: "HEDERA_TESTNET_RPC_URL", name: "Hedera Testnet" });
        chainIds.push(296);

        // Zircuit Testnet
        chainConfigs[48899] = ChainConfig({ rpcUrl: "ZIRCUIT_TESTNET_RPC_URL", name: "Zircuit Testnet" });
        chainIds.push(48899);

        // Base Sepolia
        chainConfigs[84532] = ChainConfig({ rpcUrl: "BASE_SEPOLIA_RPC_URL", name: "Base Sepolia" });
        chainIds.push(84532);

        // Scroll Testnet
        chainConfigs[534351] = ChainConfig({ rpcUrl: "SCROLL_TESTNET_RPC_URL", name: "Scroll Testnet" });
        chainIds.push(534351);
    }

    function run() external {
        // Deploy on each chain
        for (uint256 i = 0; i < chainIds.length; i++) {
            uint256 chainId = chainIds[i];
            ChainConfig memory config = chainConfigs[chainId];

            // Get RPC URL from environment variable
            string memory rpcUrl = vm.envString(config.rpcUrl);

            // Create fork for this chain
            vm.createSelectFork(rpcUrl);

            // Verify we're on the right chain
            uint256 currentChainId;
            assembly {
                currentChainId := chainid()
            }
            require(currentChainId == chainId, "Wrong chain");

            console.log("\n=== Deploying to %s ===", config.name);
            console.log("Using RPC URL from env var:", config.rpcUrl);

            // Start broadcasting transactions
            vm.startBroadcast();

            // Deploy Ahora with initial owner and merkle root
            bytes32 merkleRoot = bytes32(0); // Replace with actual merkle root
            Ahora ahora = new Ahora(msg.sender, merkleRoot);

            console.log("Ahora deployed at:", address(ahora));
            console.log("Chain ID:", chainId);

            vm.stopBroadcast();
        }
    }

    // Helper function to verify contracts after deployment
    function verify(address contractAddress, bytes memory constructorArgs) internal {
        // This is a placeholder for contract verification logic
        // Implementation will depend on the block explorer API
    }
}
