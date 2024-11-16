// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { IPoolManager } from "v4-core/src/interfaces/IPoolManager.sol";
import { IHooks } from "v4-core/src/interfaces/IHooks.sol";
import { PoolKey } from "v4-core/src/types/PoolKey.sol";
import { Currency, CurrencyLibrary } from "v4-core/src/types/Currency.sol";
import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { IERC20Metadata } from "openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { TokenizedFundsOracle } from "./TokenizedFundsOracle.sol";
import { IPermit2 } from "permit2/src/interfaces/IPermit2.sol";
import { LiquidityAmounts } from "v4-core/test/utils/LiquidityAmounts.sol";
import { TickMath } from "v4-core/src/libraries/TickMath.sol";
import { Actions } from "v4-periphery/src/libraries/Actions.sol";
import { Constants } from "./Constants.sol";

contract LPFactory is TokenizedFundsOracle, Constants {
    using CurrencyLibrary for Currency;

    // State variables
    IPoolManager public immutable poolManager;
    IHooks public immutable hook;
    mapping(address => bytes32) public priceFeedIds;

    // Events and Errors
    event PoolCreated(address indexed token0, address indexed token1, uint24 fee);
    event LiquidityAdded(address indexed token0, address indexed token1, int256 amount0, int256 amount1);
    error InvalidBaseToken(address token);
    error InvalidToken0(address token);

    constructor(
        IPoolManager _poolManager,
        IHooks _hook,
        address pythContract
    ) TokenizedFundsOracle(pythContract) {
        poolManager = _poolManager;
        hook = _hook;
        priceFeedIds[address(0)] = ETH_USD_FEED;
        priceFeedIds[WBTC] = BTC_USD_FEED;
    }

    modifier hasEnoughFunds(uint256 requiredAmount) {
        require(address(this).balance >= requiredAmount, "Insufficient contract balance");
        _;
    }

    function createPoolsAndAddLiquidity(
        address token,
        bytes32 tokenPriceFeed,
        bytes[] calldata priceUpdates
    ) external hasEnoughFunds(INITIAL_ETH_AMOUNT) returns (PoolKey[] memory pools) {
        priceFeedIds[token] = tokenPriceFeed;
        pools = new PoolKey[](2);

        pools[0] = _createPoolAndAddLiquidity(token, CurrencyLibrary.ADDRESS_ZERO, priceUpdates);
        pools[1] = _createPoolAndAddLiquidity(token, Currency.wrap(WBTC), priceUpdates);
    }

    function _createPoolAndAddLiquidity(
        address tokenA,
        Currency baseToken,
        bytes[] calldata priceUpdates
    ) internal returns (PoolKey memory pool) {
        if (Currency.unwrap(baseToken) != Currency.unwrap(CurrencyLibrary.ADDRESS_ZERO) && 
            Currency.unwrap(baseToken) != WBTC) {
            revert InvalidBaseToken(Currency.unwrap(baseToken));
        }

        pool = PoolKey({
            currency0: baseToken,
            currency1: Currency.wrap(tokenA),
            fee: POOL_FEE,
            tickSpacing: TICK_SPACING,
            hooks: hook
        });

        (uint256 amount0, uint256 amount1) = _calculateTokenAmounts(baseToken, tokenA, priceUpdates);
        
        bytes[] memory params = _preparePoolOperations(
            pool,
            amount0,
            amount1,
            MIN_TICK,
            MAX_TICK
        );

        _handleTokenApprovals(baseToken, tokenA);

        uint256 value = baseToken == CurrencyLibrary.ADDRESS_ZERO ? amount0 : 0;
        POSITION_MANAGER.multicall{value: value}(params);

        emit PoolCreated(Currency.unwrap(baseToken), tokenA, POOL_FEE);
        emit LiquidityAdded(Currency.unwrap(baseToken), tokenA, int256(amount0), int256(amount1));
    }

    function _preparePoolOperations(
        PoolKey memory pool,
        uint256 amount0,
        uint256 amount1,
        int24 tickLower,
        int24 tickUpper
    ) internal view returns (bytes[] memory) {
        bytes[] memory params = new bytes[](2);
        bytes memory hookData = new bytes(0);

        // Initialize pool using PositionManager
        params[0] = abi.encodeWithSelector(
            POSITION_MANAGER.initializePool.selector,
            pool,
            SQRT_RATIO_1_1,
            hookData
        );

        // Calculate liquidity amount
        uint128 liquidity = LiquidityAmounts.getLiquidityForAmounts(
            SQRT_RATIO_1_1,
            TickMath.getSqrtPriceAtTick(tickLower),
            TickMath.getSqrtPriceAtTick(tickUpper),
            amount0,
            amount1
        );

        // Prepare mint position parameters
        (bytes memory actions, bytes[] memory mintParams) = _mintLiquidityParams(
            pool,
            tickLower,
            tickUpper,
            liquidity,
            amount0 + 1, // amount0Max with 1 wei slippage
            amount1 + 1, // amount1Max with 1 wei slippage
            address(this),
            hookData
        );

        // Mint liquidity using PositionManager
        params[1] = abi.encodeWithSelector(
            POSITION_MANAGER.modifyLiquidities.selector,
            abi.encode(actions, mintParams),
            block.timestamp + 60
        );

        return params;
    }

    function _mintLiquidityParams(
        PoolKey memory poolKey,
        int24 _tickLower,
        int24 _tickUpper,
        uint256 liquidity,
        uint256 amount0Max,
        uint256 amount1Max,
        address recipient,
        bytes memory hookData
    ) internal pure returns (bytes memory, bytes[] memory) {
        bytes memory actions = abi.encodePacked(uint8(Actions.MINT_POSITION), uint8(Actions.SETTLE_PAIR));

        bytes[] memory params = new bytes[](2);
        params[0] = abi.encode(
            poolKey,
            _tickLower,
            _tickUpper,
            liquidity,
            amount0Max,
            amount1Max,
            recipient,
            hookData
        );
        params[1] = abi.encode(poolKey.currency0, poolKey.currency1);
        
        return (actions, params);
    }

    function _handleTokenApprovals(Currency baseToken, address tokenA) internal {
        if (Currency.unwrap(baseToken) != Currency.unwrap(CurrencyLibrary.ADDRESS_ZERO)) {
            IERC20(Currency.unwrap(baseToken)).approve(PERMIT2, type(uint256).max);
            IPermit2(PERMIT2).approve(
                Currency.unwrap(baseToken),
                address(poolManager),
                type(uint160).max,
                type(uint48).max
            );
        }
        
        IERC20(tokenA).approve(PERMIT2, type(uint256).max);
        IPermit2(PERMIT2).approve(
            tokenA,
            address(poolManager),
            type(uint160).max,
            type(uint48).max
        );
    }

    function _calculateTokenAmounts(
        Currency currency0,
        address token1,
        bytes[] calldata priceUpdates
    ) internal returns (uint256 amount0, uint256 amount1) {
        bool isEth = Currency.unwrap(currency0) == Currency.unwrap(CurrencyLibrary.ADDRESS_ZERO);
        // currency0 must be either ETH or WBTC
        if (isEth) {
            amount0 = INITIAL_ETH_AMOUNT;
        } else if (Currency.unwrap(currency0) == WBTC) {
            amount0 = INITIAL_WBTC_AMOUNT;
        } else {
            revert InvalidToken0(Currency.unwrap(currency0));
        }

        // Get price feed IDs from mapping
        bytes32 basePriceFeed = priceFeedIds[isEth ? address(0) : Currency.unwrap(currency0)];
        bytes32 tokenPriceFeed = priceFeedIds[token1];

        // Get token decimals
        uint8 baseTokenDecimals = isEth ? 18 : IERC20Metadata(Currency.unwrap(currency0)).decimals();
        uint8 token1Decimals = IERC20Metadata(token1).decimals();

        // Fetch prices using price feeds
        uint256 baseTokenPrice = fetchPriceFeed(priceUpdates, basePriceFeed, baseTokenDecimals);
        uint256 tokenPrice = fetchPriceFeed(priceUpdates, tokenPriceFeed, token1Decimals);

        // Calculate amount1 with proper decimal scaling
        uint256 amount0UsdValue = amount0 * baseTokenPrice;
        amount1 = (amount0UsdValue * (10 ** token1Decimals)) / (tokenPrice * 1e8);
    }

    // TODO : function buy with boolean in params, which will let us know if the user just buys or buys and deposit on LP
    // Same for sell.

    receive() external payable {}
}
