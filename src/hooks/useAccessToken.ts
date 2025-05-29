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
import {
  bridgeService,
  getStatusService,
  mintService,
  postBridgeService,
  postMintService,
} from '../services/accessTokenService'

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

  const {
    showPendingToast,
    updatePendingToast,
    closeToast,
    showSuccessToast,
    showWarningToast,
  } = useToast()

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
      const accessToken = await postMintService(address, chainId)
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
      await onGetStatus()
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
      const token = await getStatusService(address, chainId)
      if (!token.body) {
        throw new Error('Token is null')
      }

      setIsCompliant(
        token.body.provider.status || token.body.accessToken.status || false
      )
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
      const accessToken = await postBridgeService(
        address,
        chainId,
        sourceChainId
      )

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

      showSuccessToast(tx, 'Bridge signature successfully')
      await onGetStatus()
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
