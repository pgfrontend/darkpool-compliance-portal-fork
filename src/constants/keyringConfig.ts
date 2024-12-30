import { ChainId } from '../types'

export const keyringConfig: { [chainId: number]: string } = {
  [ChainId.MAINNET]: "https://app.keyring.network/policies/singularity",
  [ChainId.SEPOLIA]: "https://uat-app.keyring.network/policies/singularity",
  [ChainId.HARDHAT]: "https://app.keyring.network/policies/singularity",
}