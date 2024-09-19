import axios from 'axios'
import { url } from 'inspector'
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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface AccessToken {
  signature: string
  receiverAddress: string
  expiresAt: string
  targetChainId: string
}

export const useAccessToken = () => {
  const [loading, setLoading] = useState(true)
  const { address, chainId } = useAccount()
  const [error, setError] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [mintLoading, setMintLoading] = useState<boolean>(false)
  const [bridgeLoading, setBridgeLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null)

  const { showPendingToast, closeToast, showSuccessToast, showWarningToast } =
    useToast()

  useEffect(() => {
    if (address && chainId) {
      onGetStatus().then((res) => {
        if (res && res.body) {
          setIsAuthorized(res.body.status)
        }
      })
    }
  }, [address, chainId])

  const onAddSignature = async () => {
    if (!address || !chainId) {
      setError('Address or chainId is undefined')
      return
    }
    setMintLoading(true)
    showPendingToast(undefined, 'Adding signature...')
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

      showSuccessToast('Signature added successfully')
      setIsAuthorized(true)
      setAccessToken(accessToken.body)
    } catch (error: any) {
      console.error(error)
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
      showPendingToast(undefined, 'Checking compliance status...')
      const response = await axios({
        method: 'GET',
        url: `${BACKEND_URL}/api/token/status`,
        params: {
          walletAddress: address,
          targetChainId: chainId.toString(),
        } as GetStatusRequest,
      })

      showSuccessToast(undefined, 'Compliance status checked successfully')
      return response.data as GetStatusResponse
    } catch (error: any) {
      console.error('Error checking compliance status:', error)
      setError(error.message)
      showWarningToast(undefined, error.message)
    } finally {
      closeToast()
    }
  }

  const onBridgeSignature = async (sourceChainId: number) => {
    if (!address || !chainId) {
      setError('Address or chainId is undefined')
      return
    }
    setBridgeLoading(true)
    showPendingToast(undefined, 'Importing token...')
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

      showSuccessToast('Bridge signature successfully')
      setIsAuthorized(true)
      setAccessToken(accessToken.body)
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
    loading,
    onAddSignature,
    onGetStatus,
    onBridgeSignature,
    error,
    isAuthorized,
    mintLoading,
    bridgeLoading,
    accessToken,
  }
}
