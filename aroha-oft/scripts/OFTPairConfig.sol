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

        // pairs[0] = TokenConfig({
        //     name: "US Treasuries",
        //     symbol: "OUSG",
        //     decimals: 18,
        //     unichainId: 1301, // Unichain Sepolia
        //     remoteChainId: 80002 // Polygon Amoy
        // });

        pairs[0] = TokenConfig({
            name: "Backed lB01 $ Treasury Bond",
            symbol: "blB01",
            decimals: 18,
            unichainId: 1301, // Unichain Sepolia
            remoteChainId: 534351 // Scroll Testnet
        });

        return pairs;
    }
}
