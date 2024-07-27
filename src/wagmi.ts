import { http, createConfig } from 'wagmi'
import { arbitrum, polygon, base, hardhat, mainnet, sepolia, Chain } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'
import { chainsConfig, config } from "./constants/config";
import { ChainId } from './types';
import { Transport, defineChain } from 'viem';

const hardhatArbitrum = defineChain({
    id: ChainId.HARDHAT_ARBITRUM,
    name: 'Hardhat Arbitrum',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
    },
})

const hardhatPolygon = defineChain({
    id: ChainId.HARDHAT_BASE,
    name: 'Hardhat Base',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
    },
})

const bounceBitTestnet = defineChain({
    id: ChainId.BounceBitTestnet,
    name: 'BounceBit Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'BB',
        symbol: 'BB',
    },
    rpcUrls: {
        default: { http: ['https://fullnode-testnet.bouncebitapi.com/'] },
    },
})

const bounceBitMainnet = defineChain({
    id: ChainId.BounceBit,
    name: 'BounceBit',
    nativeCurrency: {
        decimals: 18,
        name: 'BB',
        symbol: 'BB',
    },
    rpcUrls: {
        default: { http: ['https://fullnode-mainnet.bouncebitapi.com/'] },
    },
})

const wagmiChainIdMapping: Record<number, Chain> = {
    [ChainId.MAINNET]: mainnet,
    [ChainId.SEPOLIA]: sepolia,
    [ChainId.POLYGON]: polygon,
    [ChainId.BASE]: base,
    [ChainId.BounceBit]: bounceBitMainnet,
    [ChainId.BounceBitTestnet]: bounceBitTestnet,
    [ChainId.HARDHAT]: hardhat,
    [ChainId.HARDHAT_BASE]: hardhatPolygon,
    [ChainId.HARDHAT_ARBITRUM]: hardhatArbitrum,
    [ChainId.ARBITRUM_ONE]: arbitrum,
}

const supportedWagmiChains = chainsConfig.supportedChains.map((chainId) => wagmiChainIdMapping[chainId])

const rpcMapToTransport = (rpcMap: Record<number, string>) => {
    const transports: Record<number, Transport> = {}
    for (const chainId in rpcMap) {
        transports[chainId] = http(rpcMap[chainId])
    }
    return transports
}

export const wagmiConfig = createConfig({
    chains: [supportedWagmiChains[0],...supportedWagmiChains.slice(1)],
    connectors: [
        metaMask(),
        coinbaseWallet({ appName: 'Singularity' }),
        walletConnect({
            projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ?? '',
            showQrModal: true,
        }),
    ],
    ssr: true,
    transports: rpcMapToTransport(chainsConfig.rpcUrls),
})

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}