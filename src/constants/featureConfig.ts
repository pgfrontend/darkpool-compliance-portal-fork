import { ChainId, ComplianceOnboardingVendor, ComplianceOnboardingType } from '../types'


export type DAppConfig = {
    complianceType: ComplianceOnboardingType,
    complianceVendors: ComplianceOnboardingVendor[],
}

export const dappConfig: { [chainId: number]: DAppConfig } = {
    [ChainId.MAINNET]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING],
    },
    [ChainId.ARBITRUM_ONE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
    },
    [ChainId.BASE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.COINBASE_EAS, ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
    },
    [ChainId.BounceBit]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME],
    },
    [ChainId.SEPOLIA]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
    },
    [ChainId.BounceBitTestnet]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME],
    },
    [ChainId.HARDHAT]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING],
    },
    [ChainId.HARDHAT_ARBITRUM]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
    },
    [ChainId.HARDHAT_BASE]: {
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
    },
}
