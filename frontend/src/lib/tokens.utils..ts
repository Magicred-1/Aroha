import { hederaTestnet, lineaSepolia, rootstockTestnet, zircuitTestnet } from "viem/chains";

const unichainSepolia = {
    id: 1301,
    name: 'UniChain Sepolia',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://endpoints.omniatech.io/v1/unichain/sepolia/public'] },
    },
  }

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

export const contracts = {
    [zircuitTestnet.id]: {
      "aroha": ""
    },
    [unichainSepolia.id]: {
      "aroha": ""
    },
    [rootstockTestnet.id]: {
      "aroha": ""
    },
    [lineaSepolia.id]: {
      "aroha": ""
    },
    [hederaTestnet.id]: {
      "aroha": "",
    },
}