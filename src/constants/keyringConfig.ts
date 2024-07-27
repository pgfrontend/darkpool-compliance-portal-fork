import { ChainId } from '../types'
import { KeyringConfig } from '@keyringnetwork/frontend-sdk'
import { networkConfig } from './networkConfig'

export const keyringConfig: { [chainId: number]: KeyringConfig } = {
  [ChainId.MAINNET]: {
    keyringGuardAddress: '0x630aD89523a18fA30F752297F3F53B7BC363488b',
    urlOverrides: {
      onboardingUrl: 'https://app.keyring.network/onboarding',
      zkCredentialUrl: 'https://app.keyring.network/credentials',
    },
    uiConfig: {
      whiteLabel: {
        appName: 'singularity',
      },
    },
    disablePolicyChoosing: true,
  },
  [ChainId.SEPOLIA]: {
    keyringGuardAddress: '0x2304E3F0FC2b2EE3F18A8cE06459458d406C96aa',
    urlOverrides: {
      onboardingUrl: 'https://uat-app.keyring.network/onboarding',
      zkCredentialUrl: 'https://uat-app.keyring.network/credentials',
    },
    uiConfig: {
      whiteLabel: {
        appName: 'singularity',
      },
    },
    disablePolicyChoosing: true,
  },
  [ChainId.HARDHAT]: {
    keyringGuardAddress: networkConfig[ChainId.HARDHAT].complianceManager,
    urlOverrides: {
      onboardingUrl: 'https://uat-app.keyring.network/onboarding',
      zkCredentialUrl: 'https://uat-app.keyring.network/zkcredentials',
    },
    uiConfig: {
      whiteLabel: {
        appName: 'singularity',
      },
    },
    disablePolicyChoosing: true,
  },
}
