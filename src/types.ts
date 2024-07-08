import { BigNumber } from '@ethersproject/bignumber'

export class DarkpoolError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DarkpoolError'
    Object.setPrototypeOf(this, DarkpoolError.prototype)
  }
}

export type HexData = `0x${string}`


export type Config = {
  chainId: number
  supportedChains: number[]
  rpcUrls: Record<number, string>
}

export type ChainConfig = {
  chainId: number
  networkConfig: NetworkConfig
  rpcUrl: string
}

export type NetworkConfig = {
  complianceManager: HexData
  darkpoolAssetManager: HexData
  explorerUrl: {
    tx: string
    address: string
    block: string
  }
}


export enum ChainId {
  HARDHAT = 31337,
  HARDHAT_ARBITRUM = 31338,
  HARDHAT_POLYGON = 31339,
  MAINNET = 1,
  GOERLI = 5,
  SEPOLIA = 11155111,
  ARBITRUM_ONE = 42161,
  OPTIMISM = 10,
  POLYGON = 137,
  CELO = 42220,
  BNB = 56,
  AVALANCHE = 43114,
  BASE = 100,
  BounceBit = 6001,
  BounceBitTestnet = 6000,
}


export enum ComplianceOnboardingType {
  SINGLE = 1,
  COMBO = 2,
}

export enum ComplianceOnboardingVendor {
  KEYRING = 1,
  ZKME = 2,
  QUADRATA = 3,
}