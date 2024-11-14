import { ChainId, ComplianceOnboardingVendor, ComplianceOnboardingType } from '../types'


export type DAppConfig = {
    complianceType: ComplianceOnboardingType,
    complianceVendors: ComplianceOnboardingVendor[],
}

export const dappConfig: { [chainId: number]: DAppConfig } = {
    [ChainId.MAINNET]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.ARBITRUM_ONE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.BASE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.COINBASE_EAS, ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.BounceBit]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.SEPOLIA]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.BounceBitTestnet]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.AlphaSeaseed]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.HARDHAT]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.HARDHAT_ARBITRUM]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
    [ChainId.HARDHAT_BASE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.SYNAPS],
    },
}
