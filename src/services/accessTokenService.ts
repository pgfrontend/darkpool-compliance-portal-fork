import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abi as accessTokenAbi } from '../abis/AccessPortal.json'
import { accessTokenConfig } from '../constants/accessTokenConfig'

import { wagmiConfig } from '../wagmi'
import { writeContract } from '@wagmi/core'

export const mintService = async (
  receiver: string,
  expiresAt: number,
  signature: string,
  chainId: ChainId
) => {
  const tx = await writeContract(wagmiConfig, {
    address: accessTokenConfig[chainId].contractAddress as `0x${string}`,
    abi: accessTokenAbi,
    functionName: 'mint',
    args: [receiver, expiresAt, signature],
  })

  return tx
}
