import { ChainId, DarkpoolError } from "../types"
import { VerificationLevel } from "@zkmelabs/widget"
type ZKMEConfigType = {
    APP_ID: string,
    DAPP_NAME: string,
    lvStr: VerificationLevel,
    lv: number,
    apiModePermission: number,
    isMint: boolean,
}

export const zkMeProgramNo: Record<number, string> = {
    [ChainId.ARBITRUM_ONE]: '202406070001',
    [ChainId.BASE]: '202408180001',
    [ChainId.BounceBit]: '202407040001',
    [ChainId.HARDHAT_ARBITRUM]: '202406070001',
    [ChainId.HARDHAT_BASE]: '202408180001',
}

export const defaultZkMeConfig: ZKMEConfigType = {
    APP_ID: 'M2024051150095529813200224669025',
    DAPP_NAME: 'Singularity',
    lvStr: 'zkKYC',
    lv: 1,
    apiModePermission: 1,
    isMint: true,
}

export const zkMeConfigTransactional: ZKMEConfigType = {
    APP_ID: 'M2024070486916998332263634166193',
    DAPP_NAME: 'Singularity',
    lvStr: 'zkKYC',
    lv: 1,
    apiModePermission: 1,
    isMint: false,
}

export const zkMekChainMapping: Record<number, number> = {
    [ChainId.HARDHAT_ARBITRUM]: ChainId.ARBITRUM_ONE,
    [ChainId.HARDHAT_BASE]: ChainId.BASE,
}


export const zkMeConfigByChainId: Record<number, ZKMEConfigType> = {
    [ChainId.BounceBit]: zkMeConfigTransactional,
    [ChainId.BounceBitTestnet]: zkMeConfigTransactional,
}

export const getZkMeProgramNoByChainId = (chainId: number): string => {
    if (zkMeProgramNo.hasOwnProperty(chainId)) {
        return zkMeProgramNo[chainId]
    } else {
        throw new DarkpoolError(`No zkMe program no found for chainId: ${chainId}`)
    }
}

export const getZkMeConfigByChainId = (chainId: number): ZKMEConfigType => {
    if (zkMeConfigByChainId.hasOwnProperty(chainId)) {
        return zkMeConfigByChainId[chainId]
    } else {
        return defaultZkMeConfig
    }
}