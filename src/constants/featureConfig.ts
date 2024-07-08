import { ChainId, ComplianceOnboardingVendor, ComplianceOnboardingType } from '../types'

export enum DefiFeature {
    UNISWAP = 'UNISWAP',
    CURVE = 'CURVE',
    ROCKETPOOL = 'ROCKETPOOL',
}

export enum MenuId {
    DASHBOARD = 'dashboard',
    DEPOSIT_WITHDRAW = 'depositwithdraw',
    JOIN_SPLIT = 'joinsplit',
    TRANSFER = 'transfer',
    DEFI = 'defi',
    STAKING = 'staking',
    TOOLS = 'tools',
}

export type DAppConfig = {
    defiFeatures: DefiFeature[],
    complianceType: ComplianceOnboardingType,
    complianceVendors: ComplianceOnboardingVendor[],
    disabledMenus: MenuId[]
    disableTokenSearch?: boolean
    disablePriceOracle?: boolean
}

export const dappConfig: { [chainId: number]: DAppConfig } = {
    [ChainId.MAINNET]: {
        defiFeatures: [DefiFeature.UNISWAP, DefiFeature.CURVE, DefiFeature.ROCKETPOOL],
        complianceType: ComplianceOnboardingType.SINGLE,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.ARBITRUM_ONE]: {
        defiFeatures: [DefiFeature.UNISWAP],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.POLYGON]: {
        defiFeatures: [DefiFeature.UNISWAP],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.BounceBit]: {
        defiFeatures: [],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME],
        disabledMenus: [MenuId.DASHBOARD, MenuId.DEFI],
        disableTokenSearch: true,
        disablePriceOracle: true,
    },
    [ChainId.SEPOLIA]: {
        defiFeatures: [DefiFeature.UNISWAP],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.BounceBitTestnet]: {
        defiFeatures: [],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME],
        disabledMenus: [MenuId.DASHBOARD, MenuId.DEFI, MenuId.TOOLS],
    },
    [ChainId.HARDHAT]: {
        defiFeatures: [DefiFeature.UNISWAP, DefiFeature.CURVE, DefiFeature.ROCKETPOOL],
        complianceType: ComplianceOnboardingType.SINGLE,
        complianceVendors: [ComplianceOnboardingVendor.KEYRING],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.HARDHAT_ARBITRUM]: {
        defiFeatures: [DefiFeature.UNISWAP],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
        disabledMenus: [MenuId.DASHBOARD],
    },
    [ChainId.HARDHAT_POLYGON]: {
        defiFeatures: [DefiFeature.UNISWAP],
        complianceType: ComplianceOnboardingType.COMBO,
        complianceVendors: [ComplianceOnboardingVendor.ZKME, ComplianceOnboardingVendor.QUADRATA],
        disabledMenus: [MenuId.DASHBOARD],
    },
}
