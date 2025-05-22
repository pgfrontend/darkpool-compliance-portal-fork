import { ChainId } from '../types'

export const confirmationsConfig: { [chainId: number]: number } = {
  [ChainId.MAINNET]: 1,
  [ChainId.ARBITRUM_ONE]: 3,
  [ChainId.BASE]: 3,
  [ChainId.SEPOLIA]: 2,
  [ChainId.HARDHAT]: 2,
  [ChainId.HARDHAT_ARBITRUM]: 2,
}

export const DEFAULT_CONFIRMATIONS = 2
