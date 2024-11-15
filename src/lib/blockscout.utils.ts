import { unichainSepolia } from "viem/chains"

export const getBlockscoutTxUrl = (network: number, txHash: string) => {
    switch (network) {
        case unichainSepolia.id: {
            return `https://unichain-sepolia.blockscout.com/tx/${txHash}`
        }
        default: {
            return `https://${network}.blockscout.com/tx/${txHash}`
        }
    }
}