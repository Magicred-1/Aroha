// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

contract DeploymentConstants {
    bytes32 public constant BASE_PRICE_FEED_ID = 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a;

    // ERC20Funds
    address public constant USDTBL_UNICHAIN = 0x8B3200C0e21f121df60EF717A74617Df4Fa367af;
    address public constant USDTBL_BASE = 0x8B3200C0e21f121df60EF717A74617Df4Fa367af;
    address public constant OUSG_UNICHAIN = 0x2b72cd292fDaba8eB00B407186235025fb70B517;
    address public constant OUSG_AMOY = 0x2b72cd292fDaba8eB00B407186235025fb70B517;
    address public constant BLB01_UNICHAIN = 0x3a0c752A41FC0925f60c6C2Ba32881C14e8D7575;
    address public constant BLB01_SCROLL = 0x3a0c752A41FC0925f60c6C2Ba32881C14e8D7575;

    // Layer 0
    address public constant AHORA = 0xD9fBDE12BAc5681B8b9a92810c3f3A48286A916e;
    uint32 public ahoraId = 1;
    address public constant BASE_OAPP = 0xFeBfF4aE0A55Be9A48E239648DF53e0FC462F60A;
    uint32 public baseId = 2;
    address public constant AMOY_OAPP = 0x4fd942f2EEB09Bbadb31Abde6dA550CA2877071E;
    uint32 public amoyId = 3;
    address public constant SCROLL_OAPP = 0x4fd942f2EEB09Bbadb31Abde6dA550CA2877071E;
    uint32 public scrollId = 4;
}
