import { ethers } from 'ethers'
import { ChainId } from '../types'
import accessPortalAbi from '../abis/accessPortal.abi'
import { accessTokenConfig } from '../constants/accessTokenConfig'

import { wagmiConfig } from '../wagmi'
import { writeContract } from '@wagmi/core'

export const mintService = async (
  receiver: string,
  expiresAt: number,
  signature: string,
  signatureExpiresAt: number,
  chainId: ChainId
) => {
  try {
    const tx = await writeContract(wagmiConfig, {
      address: accessTokenConfig[chainId].contractAddress as `0x${string}`,
      abi: accessPortalAbi,
      functionName: 'mint',
      args: [
        receiver as `0x${string}`,
        BigInt(expiresAt),
        BigInt(signatureExpiresAt),
        signature as `0x${string}`,
      ],
    })

    return tx
  } catch (error) {
    console.error('Error minting access token', error)
    throw error
  }
}

export const bridgeService = async (
  receiver: string,
  expiresAt: number,
  bridgedFromChainId: number,
  signature: string,
  signatureExpiresAt: number,
  chainId: ChainId
) => {
  try {
    const tx = await writeContract(wagmiConfig, {
      address: accessTokenConfig[chainId].contractAddress as `0x${string}`,
      abi: accessPortalAbi,
      functionName: 'mintBridged',
      args: [
        receiver as `0x${string}`,
        BigInt(expiresAt),
        BigInt(bridgedFromChainId),
        BigInt(signatureExpiresAt),
        signature as `0x${string}`,
      ],
    })

    return tx
  } catch (error) {
    console.error('Error bridging access token', error)
    throw error
  }
}
