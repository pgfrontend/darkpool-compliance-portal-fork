import { ChainConfig, Config } from '../types';
import { networkConfig } from './networkConfig';

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || (() => { throw new Error('NEXT_PUBLIC_CHAIN_ID is not defined'); })()
const SUPPORTED_CHAINS = process.env.NEXT_PUBLIC_SUPPORTED_CHAINS || (() => { throw new Error('NEXT_PUBLIC_SUPPORTED_CHAINS is not defined'); })()
const RPC_URLS = process.env.NEXT_PUBLIC_RPC_URLS || (() => { throw new Error('NEXT_PUBLIC_RPC_URLS is not defined'); })()


const processConfig = (supportedChains: string, rpcUrls: string): Config => {
  const chains = supportedChains.split(',').map(Number)
  const urls = rpcUrls.split(',')
  if (urls.length !== chains.length) {
    throw new Error('Length of NEXT_PUBLIC_RPC_URLS is not equal to supported chains')
  }

  const rpcMap: Record<number, string> = {};
  chains.forEach((chain, index) => {
    rpcMap[chain] = urls[index]
  })

  return {
    chainId: CHAIN_ID,
    supportedChains: chains,
    rpcUrls: rpcMap,
  }
}

const createChainConfig = (chainId: number, chainsConfig: Config): ChainConfig => {
  return {
    chainId: chainId,
    networkConfig: networkConfig[chainId],
    rpcUrl: chainsConfig.rpcUrls[chainId],
  }

}

export const chainsConfig: Config = processConfig(SUPPORTED_CHAINS, RPC_URLS)


export const config = createChainConfig(CHAIN_ID, chainsConfig)