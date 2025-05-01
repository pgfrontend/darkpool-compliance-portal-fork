import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  AddSignatureRequest,
  AddSignatureResponse,
  BridgeSignatureRequest,
  BridgeSignatureResponse,
  GetStatusRequest,
  GetStatusResponse,
} from '../types'
import { useToast } from '../contexts/ToastContext/hooks'
import { bridgeService, mintService } from '../services/accessTokenService'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface AccessToken {
  signature: string
  receiverAddress: string
  expiresAt: string
  targetChainId: string
}

export const useAccessToken = () => {
  const { address, chainId } = useAccount()
  const [error, setError] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [isGetStatusLoading, setIsGetStatusLoading] = useState<boolean>(false)
  const [mintLoading, setMintLoading] = useState<boolean>(false)
  const [bridgeLoading, setBridgeLoading] = useState<boolean>(false)
  const [isCompliant, setIsCompliant] = useState<boolean>(false)
  const [mintRequired, setMintRequired] = useState<boolean>(false)

  const [expiresAt, setExpiresAt] = useState<string | null>(null)

  const { showPendingToast,updatePendingToast, closeToast, showSuccessToast, showWarningToast } =
    useToast()

  useEffect(() => {
    if (address && chainId) {
      onGetStatus()
    }
  }, [address, chainId])

  const onAddSignature = async () => {
    if (!address || !chainId) {
      setError('Address or chainId is undefined')
      return
    }
    setMintLoading(true)
    showPendingToast(undefined, 'Creating signature...')
    try {
      const response = await axios({
        method: 'POST',
        url: `${BACKEND_URL}/api/token/signature/mint`,
        data: {
          receiverAddress: address,
          targetChainId: chainId.toString(),
        } as AddSignatureRequest,
      })

      const accessToken = response.data as AddSignatureResponse

      if (!accessToken.body) {
        throw new Error('Access token is null')
      }

      const tx = await mintService(
        address,
        parseInt(accessToken.body.expiresAt),
        accessToken.body.signature,
        parseInt(accessToken.body.signatureExpiresAt),
        chainId
      )

      showSuccessToast(tx, 'Signature added successfully')
      setIsAuthorized(true)
      setExpiresAt(accessToken.body.expiresAt)
    } catch (error: any) {
      console.error(error.message)
      setError(error.message)
      showWarningToast(undefined, error.message)
    } finally {
      closeToast()
      setMintLoading(false)
    }
  }

  const onGetStatus = async () => {
    if (!address || !chainId) {
      setError('Address or chainId is undefined')
      return
    }
    try {
      setIsGetStatusLoading(true)
      const response = await axios({
        method: 'GET',
        url: `${BACKEND_URL}/api/token/status`,
        params: {
          walletAddress: address,
          targetChainId: chainId.toString(),
        } as GetStatusRequest,
      })

      const token = response.data as GetStatusResponse
      if (!token.body) {
        throw new Error('Token is null')
      }

      setIsCompliant(token.body.provider.status || token.body.accessToken.status || false)
      setMintRequired(token.body.mintRequired || false)
      setIsAuthorized(token.body.accessToken.status)
      setExpiresAt(token.body.accessToken.expiresAt)
    } catch (error: any) {
      console.error('Error checking compliance status:', error)
      setError(error.message)
      showWarningToast(undefined, error.message)
    } finally {
      setIsGetStatusLoading(false)
    }
  }

  const onBridgeSignature = async (sourceChainId: number) => {
    if (!address || !chainId) {
      setError('Address or chainId is undefined')
      return
    }
    setBridgeLoading(true)
    showPendingToast(undefined, 'Bridging token...')
    try {
      const response = await axios({
        method: 'POST',
        url: `${BACKEND_URL}/api/token/signature/bridge`,
        data: {
          receiverAddress: address, // address of wallet receiving AT
          targetChainId: chainId.toString(), // chain id where AT will be minted
          sourceChainId: sourceChainId.toString(), // chain id from where AT will be imported
        } as BridgeSignatureRequest,
      })

      const accessToken = response.data as BridgeSignatureResponse

      if (!accessToken.body) {
        throw new Error('Nothing to bridge on this chain')
      }

      const tx = await bridgeService(
        address,
        parseInt(accessToken.body.expiresAt),
        sourceChainId,
        accessToken.body.signature,
        parseInt(accessToken.body.signatureExpiresAt),
        chainId
      )

      setIsAuthorized(true)
      setExpiresAt(accessToken.body.expiresAt)
      showSuccessToast(tx, 'Bridge signature successfully')
    } catch (error: any) {
      console.error(error)
      setError(error.message)
      showWarningToast(undefined, error.message)
    } finally {
      closeToast()
      setBridgeLoading(false)
    }
  }

  return {
    onAddSignature,
    onGetStatus,
    onBridgeSignature,
    error,
    isAuthorized,
    isCompliant,
    mintRequired,
    isGetStatusLoading,
    mintLoading,
    bridgeLoading,
    expiresAt,
  }
}
