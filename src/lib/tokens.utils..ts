import { hederaTestnet, lineaSepolia, rootstockTestnet, unichainSepolia, zircuitTestnet } from "viem/chains";

export const stablecoins = {
    [zircuitTestnet.id]: {
    },
    [unichainSepolia.id]: {
        "USDC": "0x31d0220469e10c4E71834a79b1f276d740d3768F",
    },
    [rootstockTestnet.id]: {
    },
    [lineaSepolia.id]: {
    },
    [hederaTestnet.id]: {
        "USDC": "0.0.429274",
    },
}