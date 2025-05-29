import {
  AddSignatureRequest,
  AddSignatureResponse,
  BridgeSignatureRequest,
  BridgeSignatureResponse,
  ChainId,
  GetStatusRequest,
  GetStatusResponse,
} from '../types'
import accessPortalAbi from '../abis/accessPortal.abi'
import { wagmiConfig } from '../wagmi'
import { writeContract } from '@wagmi/core'
import { networkConfig } from '../constants/networkConfig'
import { BACKEND_URL, mintFee } from '../constants/config'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { getConfirmations } from './transactionServices'
import axios from 'axios'

export const postMintService = async (address: string, chainId: number) => {
  const response = await axios({
    method: 'POST',
    url: `${BACKEND_URL}/api/token/signature/mint`,
    data: {
      receiverAddress: address,
      targetChainId: chainId.toString(),
    } as AddSignatureRequest,
  })

  const accessToken = response.data as AddSignatureResponse
  return accessToken
}

export const mintService = async (
  receiver: string,
  expiresAt: number,
  signature: string,
  signatureExpiresAt: number,
  chainId: ChainId
) => {
  try {
    const tx = await writeContract(wagmiConfig, {
      address: networkConfig[chainId].accessPortal as `0x${string}`,
      abi: accessPortalAbi,
      functionName: 'mint',
      args: [
        receiver as `0x${string}`,
        BigInt(expiresAt),
        BigInt(signatureExpiresAt),
        signature as `0x${string}`,
      ],
      value: mintFee,
    })

    await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
      confirmations: getConfirmations(chainId),
    })

    return tx
  } catch (error) {
    console.error('Error minting access token', error)
    throw error
  }
}

export const postBridgeService = async (
  receiver: string,
  targetChainId: number,
  sourceChainId: number
) => {
  const response = await axios({
    method: 'POST',
    url: `${BACKEND_URL}/api/token/signature/bridge`,
    data: {
      receiverAddress: receiver, // address of wallet receiving AT
      targetChainId: targetChainId.toString(), // chain id where AT will be minted
      sourceChainId: sourceChainId.toString(), // chain id from where AT will be imported
    } as BridgeSignatureRequest,
  })

  const accessToken = response.data as BridgeSignatureResponse
  return accessToken
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
      address: networkConfig[chainId].accessPortal as `0x${string}`,
      abi: accessPortalAbi,
      functionName: 'mintBridged',
      args: [
        receiver as `0x${string}`,
        BigInt(expiresAt),
        BigInt(bridgedFromChainId),
        BigInt(signatureExpiresAt),
        signature as `0x${string}`,
      ],
      value: mintFee,
    })

    await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
      confirmations: getConfirmations(chainId),
    })

    return tx
  } catch (error) {
    console.error('Error bridging access token', error)
    throw error
  }
}

export const getStatusService = async (address: string, chainId: number) => {
  const response = await axios({
    method: 'GET',
    url: `${BACKEND_URL}/api/token/status`,
    params: {
      walletAddress: address,
      targetChainId: chainId.toString(),
    } as GetStatusRequest,
  })

  const status = response.data as GetStatusResponse
  return status
}
