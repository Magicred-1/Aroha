pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract TokenizedFundsOracle {
    IPyth pyth;

    error InvalidPriceExponent();

    /**
     * @param pythContract The address of the Pyth contract
     */
    constructor(address pythContract) {
        // The IPyth interface from pyth-sdk-solidity provides the methods to interact with the Pyth contract.
        // Instantiate it with the Pyth contract address from https://docs.pyth.network/price-feeds/contract-addresses/evm
        pyth = IPyth(pythContract);
    }

    function convertToUint(PythStructs.Price memory price, uint8 targetDecimals) private pure returns (uint256) {
        if (price.price < 0 || price.expo > 0 || price.expo < -255) {
            revert InvalidPriceExponent();
        }

        uint8 priceDecimals = uint8(uint32(-1 * price.expo));

        if (targetDecimals >= priceDecimals) {
            return uint(uint64(price.price)) * 10 ** uint32(targetDecimals - priceDecimals);
        } else {
            return uint(uint64(price.price)) / 10 ** uint32(priceDecimals - targetDecimals);
        }
    }

    function fetchPriceFeed(
        bytes[] calldata _priceUpdate,
        bytes32 _priceFeedAddress,
        uint8 _decimals
    ) public payable returns (uint256) {
        uint256 priceInWei;

        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        // Updating the price requires paying the fee returned by getUpdateFee.
        // WARNING: These lines are required to ensure the getPriceNoOlderThan call below succeeds. If you remove them, transactions may fail with "0x19abf40e" error.
        uint fee = pyth.getUpdateFee(_priceUpdate);
        pyth.updatePriceFeeds{ value: fee }(_priceUpdate);

        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., ETH/USD) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://pyth.network/developers/price-feed-ids
        bytes32 priceFeedId = _priceFeedAddress;
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceFeedId, 60);

        // Convert the price to the desired number of decimals.
        return priceInWei = convertToUint(price, _decimals);
    }
}
