// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { UnichainOApp } from "./UnichainOApp.sol";
import { TokenizedFundsOracle } from "./TokenizedFundsOracle.sol";

contract AhoraTrade is UnichainOApp, TokenizedFundsOracle {
    event TokenBought(address buyer, address token, uint256 amountUSD, uint256 tokenAmount, bool shouldLP);

    constructor(
        address _endpoint,
        address _owner,
        address _pythContract
    ) UnichainOApp(_endpoint, _owner) TokenizedFundsOracle(_pythContract) {}

    function buy(
        address token,
        uint256 amountToBuyInUSD,
        bool shouldCreateLP,
        bytes[] calldata priceUpdates
    ) external payable {
        // Verify price feed exists for the token
        require(priceFeedIds[token] != bytes32(0), "Price feed not available");

        // Get destination chain EID
        uint32 dstEid = destinationChainEids[token];
        require(dstEid != 0, "Destination chain not configured");

        // Get token price in USD with price updates
        uint256 tokenPrice = fetchPriceFeed(priceUpdates, priceFeedIds[token], USDC.decimals());
        require(tokenPrice > 0, "Invalid token price");

        // Calculate token amount based on USD amount
        uint256 tokenAmount = (amountToBuyInUSD * USDC.decimals()) / tokenPrice;

        // Transfer USDC from user to contract
        USDC.transferFrom(msg.sender, address(this), amountToBuyInUSD);

        // Purchase tokens through UnichainOApp
        _purchaseToken(dstEid, token, tokenAmount, shouldCreateLP);

        emit TokenBought(msg.sender, token, amountToBuyInUSD, tokenAmount, shouldCreateLP);
    }
}
