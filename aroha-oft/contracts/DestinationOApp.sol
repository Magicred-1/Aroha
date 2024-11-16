// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20Fund } from "./ERC20Fund.sol";

contract DestinationOApp is OApp {
    using SafeERC20 for IERC20;
    mapping(address => ERC20Fund) public tokens;

    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) Ownable(_owner) {}

    function _lzReceive(
        Origin calldata origin,
        bytes32 guid,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal virtual override {
        // Decode the purchase request with shouldLP flag
        (bytes32 purchaseId, address buyer, address token, uint256 amount, bool shouldLP) = abi.decode(
            payload,
            (bytes32, address, address, uint256, bool)
        );

        // The contract will mint and hold the tokens
        bool success = _handleTokenMint(address(this), token, amount);

        // Encode response message
        bytes memory responsePayload = abi.encode(purchaseId, success);

        // Get the messaging fee
        MessagingFee memory fee = _quote(origin.srcEid, responsePayload, bytes(""), false);
        require(msg.value >= fee.nativeFee, "Insufficient fee");

        // Send confirmation back to source chain
        _lzSend(origin.srcEid, responsePayload, bytes(""), fee, payable(msg.sender));
    }

    function _handleTokenMint(address buyer, address token, uint256 amount) private returns (bool) {
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
