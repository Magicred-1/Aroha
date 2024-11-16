// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { AhoraStorage } from "./AhoraStorage.sol";
import { ERC20Fund } from "./ERC20Fund.sol";

contract UnichainOApp is OApp, AhoraStorage {
    using SafeERC20 for ERC20Fund;

    // Events
    event TokenPurchaseInitiated(address buyer, uint32 dstEid, address token, uint256 amount, bool shouldLP);
    event TokenPurchaseCompleted(address buyer, uint32 dstEid, address token, uint256 amount, bool shouldLP);

    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) AhoraStorage(_owner) {}

    function _purchaseToken(uint32 dstEid, address token, uint256 tokenAmount, bool shouldLP) internal {
        require(address(supportedTokens[token]) != address(0), "Token not supported");

        // Generate purchase ID
        bytes32 purchaseId = keccak256(
            abi.encodePacked(msg.sender, dstEid, token, tokenAmount, shouldLP, block.timestamp)
        );

        // Store purchase info
        pendingPurchases[purchaseId] = PurchaseInfo({
            token: token,
            tokenAmount: tokenAmount,
            receiver: msg.sender,
            shouldLP: shouldLP
        });

        // Encode the message for the destination chain
        bytes memory payload = abi.encode(purchaseId, msg.sender, token, tokenAmount, shouldLP);

        // Get the messaging fee
        MessagingFee memory fee = _quote(dstEid, payload, bytes(""), false);
        require(msg.value >= fee.nativeFee, "Insufficient fee");

        // Send message to destination chain
        _lzSend(dstEid, payload, bytes(""), fee, payable(msg.sender));

        emit TokenPurchaseInitiated(msg.sender, dstEid, token, tokenAmount, shouldLP);
    }

    function _lzReceive(
        Origin calldata origin,
        bytes32 guid,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal virtual override {
        // Decode the completion message from destination chain
        (bytes32 purchaseId, bool success) = abi.decode(payload, (bytes32, bool));

        // Retrieve purchase info
        PurchaseInfo memory purchase = pendingPurchases[purchaseId];
        require(address(purchase.token) != address(0), "Purchase not found");
        require(success, "Purchase failed on destination chain");

        // Get the token contract and mint tokens
        ERC20Fund token = supportedTokens[purchase.token];
        require(address(token) != address(0), "Token not supported");

        // Mint tokens to the receiver
        token.mint(purchase.receiver, purchase.tokenAmount);

        // Clear the pending purchase
        delete pendingPurchases[purchaseId];

        emit TokenPurchaseCompleted(
            purchase.receiver,
            origin.srcEid,
            purchase.token,
            purchase.tokenAmount,
            purchase.shouldLP
        );
    }
}
