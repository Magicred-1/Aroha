// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { BaseOApp } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/BaseOApp.sol";
import { MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { abi } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/Encoding.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract UnichainOApp is BaseOApp {
    using SafeERC20 for IERC20;

    // Events
    event TokenPurchaseInitiated(address buyer, uint32 dstEid, address token, uint256 amount);
    event TokenPurchaseCompleted(address buyer, uint32 dstEid, address token, uint256 amount);

    // Mapping to track pending purchases
    mapping(bytes32 => bool) public pendingPurchases;

    constructor(address _endpoint, address _owner) BaseOApp(_endpoint, _owner) {}

    function purchaseToken(
        uint32 dstEid,
        address token,
        uint256 tokenAmount,
    ) external payable {
        // Generate purchase ID
        bytes32 purchaseId = keccak256(abi.encodePacked(msg.sender, dstEid, token, tokenAmount, block.timestamp));

        // Store pending purchase
        pendingPurchases[purchaseId] = true;

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

        require(pendingPurchases[purchaseId], "Purchase not found");
        require(success, "Purchase failed on destination chain");

        // Clear the pending purchase
        delete pendingPurchases[purchaseId];

        emit TokenPurchaseCompleted(msg.sender, origin.srcEid, address(0), 0);
    }
}
