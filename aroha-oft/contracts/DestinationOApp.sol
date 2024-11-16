// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DestinationOApp is OApp {
    using SafeERC20 for IERC20;
    mapping(address => IERC20) public tokens;

    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) {}

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

        // The contract will mint and hold the tokens
        bool success = _handleTokenMint(address(this), token, amount);
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
