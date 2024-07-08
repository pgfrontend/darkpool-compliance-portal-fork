import { createContext } from "react"
import { useChainId } from "wagmi"
import { config } from "../../constants"

interface Props {
    children: React.ReactNode
}

export interface ChainContextProps {
    chainId: number,
}


export const ChainContext = createContext<ChainContextProps>({
    chainId: config.chainId,
})



const ChainProvider: React.FC<Props> = ({ children }) => {

    const currentChainId = useChainId() || config.chainId

    return (
        <ChainContext.Provider
            value={{
                chainId: currentChainId,
            }}
        >
            {children}
        </ChainContext.Provider>
    )
}

export default ChainProvider