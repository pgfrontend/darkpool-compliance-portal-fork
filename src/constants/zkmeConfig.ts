import { ChainId } from "../types"

type ZKMEConfigType = {
    APP_ID: string,
    DAPP_NAME: string,
    lvStr: string,
    lv: number,
    apiModePermission: number,
    isMint: boolean,
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

export const getZkMeConfigByChainId = (chainId: number): ZKMEConfigType => {
    if (zkMeConfigByChainId.hasOwnProperty(chainId)) {
        return zkMeConfigByChainId[chainId]
    } else {
        return defaultZkMeConfig
    }
}