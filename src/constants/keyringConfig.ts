import { ChainId } from '../types'

export const keyringConfig: { [chainId: number]: string } = {
  [ChainId.MAINNET]: "https://app.keyring.network/onboarding?policyId=3&ref=singularity",
  [ChainId.SEPOLIA]: "https://uat-app.keyring.network/onboarding?policyId=4&ref=singularity",
  [ChainId.HARDHAT]: "https://app.keyring.network/onboarding?policyId=3&ref=singularity",
}