import { Provider, verifyWithZkMeServices, ZkMeWidget } from "@zkmelabs/widget"
import { zkMeConfig, zkMekChainMapping } from "../../constants/zkmeConfig"
import { useState } from "react"
import { ethers } from "ethers"
import { isAddressEquals } from "../../helpers/utils"
import axios from "axios"
import { DarkpoolError, HexData } from "../../types"
import { hexlify } from "ethers/lib/utils"
import { sendTransaction } from '@wagmi/core'
import { wagmiConfig } from "../../wagmi"


export function useZkMe(address: string | undefined, chainId: number) {
    const [loading, setLoading] = useState(false)
    const [isCompliant, setIsCompliant] = useState(false)
    const [isNotCompliant, setIsNotCompliant] = useState(false)

    const checkCompliance = async (address: string): Promise<boolean> => {
        if (ethers.utils.isAddress(address)) {
            const result = await verifyWithZkMeServices(zkMeConfig.APP_ID, address)
            return result
        } else {
            return false;
        }
    }

    const refineChainId = (chainId: number): number => {
        if (zkMekChainMapping.hasOwnProperty(chainId)) {
            return zkMekChainMapping[chainId]
        } else {
            return chainId
        }
    }

    const launchWidget = async (
    ) => {
        if (!address) {
            return
        }
        const userConnectedAddress = address

        const provider: Provider = {
            /**
             * Retrieves the access token.
             * @returns A promise that resolves to the access token.
             */
            async getAccessToken() {
                const result = await axios.get('/api/zkmeAccessToken')
                if (result.status === 200) {
                    return result.data.accessToken
                } else {
                    throw new DarkpoolError('Failed to fetch access token');
                }
            },

            /**
             * Retrieves the user accounts.
             * @returns An array of user accounts.
             */
            async getUserAccounts() {
                return [userConnectedAddress]
            },

            async delegateTransaction(tx) {
                const txResponse = await sendTransaction(wagmiConfig, {
                    data: tx.data as HexData,
                    to: tx.to as HexData,
                })
                return txResponse
            }
        }

        const refeindChainId = refineChainId(chainId)

        const zkMeWidget = new ZkMeWidget(
            zkMeConfig.APP_ID,
            zkMeConfig.DAPP_NAME,
            hexlify(refeindChainId),
            provider
        )

        zkMeWidget.on('finished', (verifiedAccount) => {
            if (isAddressEquals(verifiedAccount, userConnectedAddress)) {
                checkCompliance(userConnectedAddress).then((isCompliant) => {
                    setIsCompliant(isCompliant)
                    setIsNotCompliant(!isCompliant)
                }).catch((error) => {
                    console.log(error)
                })
            }
        })

        zkMeWidget.launch()
    }



    return { loading, isCompliant, isNotCompliant, launchWidget }

}

