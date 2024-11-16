// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20Fund } from "./ERC20Fund.sol";

contract UnichainOApp is OApp {
    using SafeERC20 for IERC20;

    struct PurchaseInfo {
        address token;
        uint256 tokenAmount;
        address receiver;
    }

    // Events
    event TokenPurchaseInitiated(address buyer, uint32 dstEid, address token, uint256 amount);
    event TokenPurchaseCompleted(address buyer, uint32 dstEid, address token, uint256 amount);
    event TokenAdded(address token);
    event TokenRemoved(address token);

    // Mapping to track pending purchases with their details
    mapping(bytes32 => PurchaseInfo) public pendingPurchases;
    // Mapping to track supported tokens
    mapping(address => ERC20Fund) public supportedTokens;

    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) {}

    function addSupportedToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(address(supportedTokens[token]) == address(0), "Token already supported");

        supportedTokens[token] = ERC20Fund(token);
        emit TokenAdded(token);
    }

    function removeSupportedToken(address token) external onlyOwner {
        require(address(supportedTokens[token]) != address(0), "Token not supported");

        delete supportedTokens[token];
        emit TokenRemoved(token);
    }

    function purchaseToken(uint32 dstEid, address token, uint256 tokenAmount) external payable {
        require(address(supportedTokens[token]) != address(0), "Token not supported");

        // Generate purchase ID
        bytes32 purchaseId = keccak256(abi.encodePacked(msg.sender, dstEid, token, tokenAmount, block.timestamp));

        // Store purchase info
        pendingPurchases[purchaseId] = PurchaseInfo({ token: token, tokenAmount: tokenAmount, receiver: msg.sender });

        // Encode the message for the destination chain
        bytes memory payload = abi.encode(purchaseId, msg.sender, token, tokenAmount);

        // Get the messaging fee
        MessagingFee memory fee = _quote(dstEid, payload);
        require(msg.value >= fee.nativeFee, "Insufficient fee");

        // Send message to destination chain
        _lzSend(dstEid, payload, abi.encodePacked(fee.nativeFee), payable(msg.sender), address(0), bytes(""));

        emit TokenPurchaseInitiated(msg.sender, dstEid, token, tokenAmount);
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

        emit TokenPurchaseCompleted(purchase.receiver, origin.srcEid, purchase.token, purchase.tokenAmount);
    }
}
