import { ChainId } from "../types"

export const zkMeConfig = {
    APP_ID: 'M2024051150095529813200224669025',
    DAPP_NAME: 'Singularity',
    lvStr: 'zkKYC',
    lv: 1,
    apiModePermission: 1,
}

export const zkMekChainMapping:Record<number, number> = {
    [ChainId.HARDHAT_ARBITRUM] : ChainId.ARBITRUM_ONE,
    [ChainId.HARDHAT_POLYGON] : ChainId.POLYGON,
}