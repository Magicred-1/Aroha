// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ERC20Fund } from "./ERC20Fund.sol";

contract AhoraStorage is Ownable {
    using SafeERC20 for ERC20;

    constructor(address initialOwner) Ownable(initialOwner) {}

    struct PurchaseInfo {
        address token;
        uint256 tokenAmount;
        address receiver;
        bool shouldLP;
    }

    // Events
    event TokenAdded(address token);
    event TokenRemoved(address token);

    // Mapping to track pending purchases with their details
    mapping(bytes32 => PurchaseInfo) public pendingPurchases;

    // Mapping to track supported tokens
    mapping(address => ERC20Fund) public supportedTokens;

    // Mapping for price feed IDs
    mapping(address => bytes32) public priceFeedIds;

    // USDC token contract
    ERC20 public immutable USDC = ERC20(0xdcCD58bd9D8Cd4486514bd8488fc49AcD4e136d7);

    // Mapping from Unichain token address to destination chain EID
    mapping(address => uint32) public destinationChainEids;

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

    function setPriceFeedId(address token, bytes32 priceFeedId) external onlyOwner {
        require(priceFeedId != bytes32(0), "Invalid price feed ID");
        priceFeedIds[token] = priceFeedId;
    }

    function setDestinationChainEids(address token, uint32 eid) external onlyOwner {
        destinationChainEids[token] = eid;
    }
}
