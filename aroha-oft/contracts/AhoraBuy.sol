// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IPoolManager } from "v4-core/src/interfaces/IPoolManager.sol";
import { PoolKey } from "v4-core/src/types/PoolKey.sol";
import { CurrencyLibrary, Currency } from "v4-core/src/types/Currency.sol";
import { Constants } from "./Constants.sol";
import { LPFactory } from "./LPFactory.sol";
import { MyOFT } from "./MyOFT.sol";

contract ArohaBuy is LPFactory, MyOFT {
    event TokenBought(address indexed user, address indexed token, uint256 amount, bool createLP);

    constructor(
        IPoolManager _poolManager,
        IHooks _hook,
        address pythContract,
        address lzEndpoint,
        address delegate
    ) LPFactory(_poolManager, _hook, pythContract) MyOFT("Aroha Token", "AROHA", lzEndpoint, delegate) {}

    function buy(
        address token,
        uint256 amountIn,
        bool createLP,
        bytes[] calldata priceUpdates
    ) external payable {
        require(amountIn > 0, "Invalid purchase amount");

        // Fetch price of the token using Pyth Oracle
        uint256 tokenPriceInWei = fetchPriceFeed(priceUpdates, priceFeedIds[token], IERC20Metadata(token).decimals());

        // Calculate the number of tokens to buy
        uint256 tokensToBuy = (msg.value * 1e18) / tokenPriceInWei;

        // Transfer the token to the user if no LP is needed
        if (!createLP) {
            _transferTokensToUser(token, tokensToBuy);
            emit TokenBought(msg.sender, token, tokensToBuy, false);
            return;
        }

        // Check if the LP exists or create it
        PoolKey memory pool = _getOrCreatePool(token, priceUpdates);

        // Deposit funds into the LP
        _addLiquidity(pool, msg.value, tokensToBuy);

        emit TokenBought(msg.sender, token, tokensToBuy, true);
    }

    function _transferTokensToUser(address token, uint256 amount) internal {
        IERC20(token).transfer(msg.sender, amount);
    }

    function _getOrCreatePool(address token, bytes[] calldata priceUpdates) internal returns (PoolKey memory pool) {
        pool = PoolKey({
            currency0: Currency.wrap(address(0)), // ETH
            currency1: Currency.wrap(token),
            fee: POOL_FEE,
            tickSpacing: TICK_SPACING,
            hooks: hook
        });

        // Initialize pool if it doesn't exist
        if (!_poolExists(pool)) {
            POSITION_MANAGER.initializePool(
                pool,
                SQRT_RATIO_1_1,
                new bytes(0) // hook data
            );
            emit PoolCreated(address(0), token, POOL_FEE);
        }
    }

    function _poolExists(PoolKey memory pool) internal view returns (bool) {
        // Check if pool exists in the PoolManager
        (bool exists, , , ) = POSITION_MANAGER.getPoolState(pool);
        return exists;
    }

    function _addLiquidity(PoolKey memory pool, uint256 ethAmount, uint256 tokenAmount) internal {
        // Approve tokens for liquidity deposit
        IERC20(Currency.unwrap(pool.currency1)).approve(address(POSITION_MANAGER), tokenAmount);

        // Add liquidity to the pool
        bytes memory actions = abi.encodePacked(uint8(Actions.MINT_POSITION));
        bytes;
        mintParams[0] = abi.encode(
            pool,
            MIN_TICK,
            MAX_TICK,
            tokenAmount,
            ethAmount,
            msg.sender,
            new bytes(0) // hook data
        );

        POSITION_MANAGER.modifyLiquidities(
            abi.encode(actions, mintParams),
            block.timestamp + 60
        );

        emit LiquidityAdded(Currency.unwrap(pool.currency0), Currency.unwrap(pool.currency1), int256(ethAmount), int256(tokenAmount));
    }
}
