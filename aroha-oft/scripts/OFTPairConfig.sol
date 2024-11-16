// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

library OFTPairConfig {
    struct TokenConfig {
        string name;
        string symbol;
        uint8 decimals;
        uint256 unichainId; // Always Unichain
        uint256 remoteChainId; // The other chain in the pair
    }

    // Array of token configurations
    function getTokenPairs() internal pure returns (TokenConfig[] memory) {
        TokenConfig[] memory pairs = new TokenConfig[](1);

        // // Pair 2: USDC (Unichain-Polygon Amoy)
        // pairs[1] = TokenConfig({
        //     name: "USDC OFT",
        //     symbol: "USDC",
        //     decimals: 6,
        //     unichainId: 1301,  // Unichain Sepolia
        //     remoteChainId: 80002  // Polygon Amoy
        // });

        // // Pair 3: WBTC (Unichain-Linea)
        // pairs[2] = TokenConfig({
        //     name: "Wrapped BTC OFT",
        //     symbol: "WBTC",
        //     decimals: 8,
        //     unichainId: 1301,  // Unichain Sepolia
        //     remoteChainId: 59141  // Linea Sepolia
        // });

        // // Pair 4: WETH (Unichain-Hedera)
        // pairs[3] = TokenConfig({
        //     name: "Wrapped ETH OFT",
        //     symbol: "WETH",
        //     decimals: 18,
        //     unichainId: 1301,  // Unichain Sepolia
        //     remoteChainId: 296  // Hedera Testnet
        // });

        // // Pair 5: DAI (Unichain-Zircuit)
        // pairs[4] = TokenConfig({
        //     name: "DAI OFT",
        //     symbol: "DAI",
        //     decimals: 18,
        //     unichainId: 1301,  // Unichain Sepolia
        //     remoteChainId: 48899  // Zircuit Testnet
        // });

        // Pair 6: MATIC (Unichain-Base)
        pairs[0] = TokenConfig({
            name: "MATIC OFT",
            symbol: "MATIC",
            decimals: 18,
            unichainId: 1301, // Unichain Sepolia
            remoteChainId: 84532 // Base Sepolia
        });

        // // Pair 7: BNB (Unichain-Scroll)
        // pairs[6] = TokenConfig({
        //     name: "BNB OFT",
        //     symbol: "BNB",
        //     decimals: 18,
        //     unichainId: 1301,  // Unichain Sepolia
        //     remoteChainId: 534351  // Scroll Testnet
        // });

        return pairs;
    }
}
