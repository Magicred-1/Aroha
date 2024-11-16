// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { BaseOApp } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/BaseOApp.sol";
import { MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { abi } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/Encoding.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DestinationOApp is BaseOApp {
    // Events
    event TokenMinted(address buyer, address token, uint256 amount);

    // Mapping of token address to MyOFT instance
    mapping(address => ERC20) public tokens;

    constructor(address _endpoint, address _owner) BaseOApp(_endpoint, _owner) {}

    function _lzReceive(
        Origin calldata origin,
        bytes32 guid,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal virtual override {
        // Decode the purchase request
        (bytes32 purchaseId, address buyer, address token, uint256 amount) = abi.decode(
            payload,
            (bytes32, address, address, uint256)
        );

        bool success = false;

        try tokens[token].mint(buyer, amount) {
            success = true;
            emit TokenMinted(buyer, token, amount);
        } catch {
            success = false;
        }

        // Encode response message
        bytes memory responsePayload = abi.encode(purchaseId, success);

        // Send confirmation back to source chain
        _lzSend(
            origin.srcEid,
            responsePayload,
            abi.encodePacked(msg.value),
            payable(msg.sender),
            address(0),
            bytes("")
        );
    }

    // Admin function to register new tokens
    function registerToken(address token) external onlyOwner {
        require(address(tokens[token]) == address(0), "Token already registered");
        tokens[token] = ERC20(token);
    }
}
