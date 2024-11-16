// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract DeploymentConstants {
    // Price feed IDs
    address public constant AHORA = 0xD9fBDE12BAc5681B8b9a92810c3f3A48286A916e;
    uint32 public ahoraId = 1;

    address public constant USDTBL_UNICHAIN = 0x8B3200C0e21f121df60EF717A74617Df4Fa367af;
    address public constant USDTBL_BASE = 0x8B3200C0e21f121df60EF717A74617Df4Fa367af;
    bytes32 public constant BASE_PRICE_FEED_ID = 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a;

    address public constant BASE_OAPP = 0xFeBfF4aE0A55Be9A48E239648DF53e0FC462F60A;
    uint32 public baseId = 2;
}
