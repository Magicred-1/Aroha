// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract ChainConfigs {
    // Chain-specific configurations
    struct ChainConfig {
        string rpcUrl;
        string name;
        address lzEndpoint;
    }

    // Mapping of chain IDs to their configurations
    mapping(uint256 => ChainConfig) public chainConfigs;

    constructor() {
        // Rootstock Testnet
        chainConfigs[31] = ChainConfig({
            rpcUrl: "ROOTSTOCK_TESTNET_RPC_URL",
            name: "Rootstock Testnet",
            lzEndpoint: 0xbc2a00d907a6Aa5226Fb9444953E4464a5f4844a
        });

        // Polygon Amoy Testnet
        chainConfigs[80002] = ChainConfig({
            rpcUrl: "POLYGON_AMOY_RPC_URL",
            name: "Polygon Amoy",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Unichain Sepolia
        chainConfigs[1301] = ChainConfig({
            rpcUrl: "UNICHAIN_SEPOLIA_RPC_URL",
            name: "Unichain Sepolia",
            lzEndpoint: 0xb8815f3f882614048CbE201a67eF9c6F10fe5035
        });

        // Ethereum Sepolia
        chainConfigs[11155111] = ChainConfig({
            rpcUrl: "ETHEREUM_SEPOLIA_RPC_URL",
            name: "Ethereum Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Base Sepolia
        chainConfigs[84532] = ChainConfig({
            rpcUrl: "BASE_SEPOLIA_RPC_URL",
            name: "Base Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Linea Sepolia
        chainConfigs[59140] = ChainConfig({
            rpcUrl: "LINEA_SEPOLIA_RPC_URL",
            name: "Linea Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Scroll Sepolia
        chainConfigs[534351] = ChainConfig({
            rpcUrl: "SCROLL_SEPOLIA_RPC_URL",
            name: "Scroll Sepolia",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Zircuit Testnet
        chainConfigs[9001] = ChainConfig({
            rpcUrl: "ZIRCUIT_TESTNET_RPC_URL",
            name: "Zircuit Testnet",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });

        // Hedera Testnet
        chainConfigs[296] = ChainConfig({
            rpcUrl: "HEDERA_TESTNET_RPC_URL",
            name: "Hedera Testnet",
            lzEndpoint: 0x6EDCE65403992e310A62460808c4b910D972f10f
        });
    }
}
