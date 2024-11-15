import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, scrollSepolia, unichainSepolia, zircuitTestnet, rootstockTestnet, lineaSepolia, hederaTestnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { config } from 'dotenv'

config();

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, scrollSepolia, unichainSepolia, zircuitTestnet, rootstockTestnet, lineaSepolia, hederaTestnet],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [scrollSepolia.id]: http(),
      [unichainSepolia.id]: http(),
      [zircuitTestnet.id]: http(),
      [rootstockTestnet.id]: http(),
      [lineaSepolia.id]: http(),
      [hederaTestnet.id]: http()
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
