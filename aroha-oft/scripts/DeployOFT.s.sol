// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {Script} from "forge-std/Script.sol";
import {Constants} from "../contracts/Constants.sol";
import {MyOFT} from "../contracts/MyOFT.sol";
import {console} from "forge-std/console.sol";

contract DeployOFTScript is Script, Constants {
    // Chain-specific configurations
    struct ChainConfig {
        string rpcUrl;
        string name;
        address lzEndpoint;
    }

    // Mapping of chain IDs to their configurations
    mapping(uint256 => ChainConfig) public chainConfigs;
    uint256[] public chainIds;

    constructor() {
        // Rootstock Testnet
        chainConfigs[31] = ChainConfig({
            rpcUrl: "ROOTSTOCK_TESTNET_RPC_URL",
            name: "Rootstock Testnet",
            lzEndpoint: 0xbc2a00d907a6Aa5226Fb9444953E4464a5f4844a
        });
        chainIds.push(31);

        // Polygon Amoy Testnet
        chainConfigs[80002] = ChainConfig({
            rpcUrl: "POLYGON_AMOY_RPC_URL",
            name: "Polygon Amoy",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
        chainIds.push(80002);

        // Unichain Sepolia
        chainConfigs[1301] = ChainConfig({
            rpcUrl: "UNICHAIN_SEPOLIA_RPC_URL",
            name: "Unichain Sepolia",
            lzEndpoint: 0xb8815f3f882614048CbE201a67eF9c6F10fe5035
        });
        chainIds.push(1301);

        // Linea Sepolia
        chainConfigs[59141] = ChainConfig({
            rpcUrl: "LINEA_SEPOLIA_RPC_URL",
            name: "Linea Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
        chainIds.push(59141);

        // Hedera Testnet
        chainConfigs[296] = ChainConfig({
            rpcUrl: "HEDERA_TESTNET_RPC_URL",
            name: "Hedera Testnet",
            lzEndpoint: 0xbD672D1562Dd32C23B563C989d8140122483631d
        });
        chainIds.push(296);

        // Zircuit Testnet
        chainConfigs[48899] = ChainConfig({
            rpcUrl: "ZIRCUIT_TESTNET_RPC_URL",
            name: "Zircuit Testnet",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
        chainIds.push(48899);

        // Base Sepolia
        chainConfigs[84532] = ChainConfig({
            rpcUrl: "BASE_SEPOLIA_RPC_URL",
            name: "Base Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
        chainIds.push(84532);

        // Scroll Testnet
        chainConfigs[534351] = ChainConfig({
            rpcUrl: "SCROLL_TESTNET_RPC_URL",
            name: "Scroll Testnet",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
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

            console.log("\n=== Deploying MyOFT to %s ===", config.name);
            console.log("Using RPC URL from env var:", config.rpcUrl);
            console.log("Using LZ Endpoint:", config.lzEndpoint);
            
            // Start broadcasting transactions
            vm.startBroadcast();

            // Deploy MyOFT with LayerZero endpoint
            MyOFT oft = new MyOFT(
                config.lzEndpoint,    // LayerZero endpoint
                "MyToken",            // Token name
                "MTK",               // Token symbol
                8                    // Decimals
            );

            console.log("MyOFT deployed at:", address(oft));
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