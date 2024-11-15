// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { PositionManager } from "v4-periphery/src/PositionManager.sol";

contract Constants {
    // Price feed IDs
    bytes32 public constant ETH_USD_FEED = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
    bytes32 public constant BTC_USD_FEED = 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43;
    
    // Token addresses
    address public constant WBTC = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
    
    // Protocol addresses
    address public constant PERMIT2 = 0x000000000022D473030F116dDEE9F6B43aC78BA3;
    PositionManager public constant POSITION_MANAGER = PositionManager(payable(0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0));
    
    // Pool parameters
    uint24 public constant POOL_FEE = 3000; // 0.3% fee tier
    
    // Initial liquidity amounts
    uint256 public constant INITIAL_ETH_AMOUNT = 1 ether;
    uint256 public constant INITIAL_WBTC_AMOUNT = 1e8;

    // Tick ranges
    int24 public constant TICK_SPACING = 60;
    int24 public constant MIN_TICK = -887220;
    int24 public constant MAX_TICK = 887220;

    // Starting price
    uint160 public constant SQRT_RATIO_1_1 = 79228162514264337593543950336; // sqrt(1) * 2^96
} 