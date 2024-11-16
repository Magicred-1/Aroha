// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { BaseOApp } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/BaseOApp.sol";
import { MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { abi } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/Encoding.sol";
import { ERC20Fund } from "./ERC20Fund.sol";

contract DestinationOApp is BaseOApp {
    // Mapping of token address to ERC20Fund instance
    mapping(address => ERC20Fund) public tokens;

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

        try {
            success = _handleTokenMint(buyer, token, amount);
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

    function _handleTokenMint(
        address buyer,
        address token,
        uint256 amount
    ) private returns (bool) {
        ERC20Fund fundToken = tokens[token];
        require(address(fundToken) != address(0), "Token not registered");
        
        // Mint tokens to the buyer
        fundToken.mint(buyer, amount);
        return true;
    }

    // Admin function to register new tokens
    function registerToken(address token) external onlyOwner {
        require(address(tokens[token]) == address(0), "Token already registered");
        tokens[token] = ERC20Fund(token);
    }
}
