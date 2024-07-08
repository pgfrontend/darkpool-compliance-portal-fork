import { KeyringProvider, KeyringWidget } from "@keyringnetwork/frontend-sdk"
import { createContext } from "react"
import { useAccount, useChainId } from "wagmi"
import { getProviderByChainId } from "../../helpers"
import { dappConfig } from "../../constants/featureConfig"
import { keyringConfig } from "../../constants/keyringConfig"
import { ComplianceOnboardingVendor, ComplianceOnboardingType } from "../../types"

interface Props {
    children: React.ReactNode
}

export interface ComplianceConfig {
}

export const ComplianceContext = createContext<ComplianceConfig>({
})

const ComplianceProvider: React.FC<Props> = ({ children }) => {

    const { address, isConnected } = useAccount()
    const chainId = useChainId()

    const isKeyringProvider = dappConfig[chainId].complianceType === ComplianceOnboardingType.SINGLE && dappConfig[chainId].complianceVendors.includes(ComplianceOnboardingVendor.KEYRING)

    const showWidget = address && isConnected && isKeyringProvider

    if (dappConfig[chainId].complianceType === ComplianceOnboardingType.SINGLE && isKeyringProvider) {
        return (
            <ComplianceContext.Provider value={{}}>
                <KeyringProvider config={keyringConfig[chainId]}>
                    {children}
                    {showWidget && (
                        <KeyringWidget
                            address={address}
                            chainId={chainId}
                            provider={getProviderByChainId(chainId)}
                        />
                    )}
                </KeyringProvider>
            </ComplianceContext.Provider>
        )
    } else
        return (
            <ComplianceContext.Provider value={{}}>
                {children}
            </ComplianceContext.Provider>
        )
}

export default ComplianceProvider