import { createContext } from "react"

interface Props {
    children: React.ReactNode
}

export interface ComplianceConfig {
}

export const ComplianceContext = createContext<ComplianceConfig>({
})

const ComplianceProvider: React.FC<Props> = ({ children }) => {
    
    return (
        <ComplianceContext.Provider value={{}}>
            {children}
        </ComplianceContext.Provider>
    )
}

export default ComplianceProvider