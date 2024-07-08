import { ComplianceOnboardingVendor } from "../types";


type VendorConfig = {
    name: string
    logo: string
    description: string
    isKyc: boolean
    isKyb: boolean
}

export const complianceVendorConfig: Record<number, VendorConfig> = {
    [ComplianceOnboardingVendor.ZKME]: {
        name: 'zkMe',
        logo: '/images/compliance/zkMe.png',
        description: 'zkMe offers KYC services using Identity Oracles powered by zero-knowledge proofs, ensuring secure, self-sovereign, and private credential verifications.',
        isKyc: true,
        isKyb: false
    },
    [ComplianceOnboardingVendor.QUADRATA]: {
        name: 'QUADRATA',
        logo: '/images/compliance/quadrata.png',
        description: 'A Passport Network bringing the identity and compliance layer to DeFi across existing public blockchains. Offers KYB services',
        isKyc: false,
        isKyb: true
    }
}