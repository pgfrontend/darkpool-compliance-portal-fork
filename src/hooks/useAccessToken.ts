import axios from 'axios'
import { url } from 'inspector'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  AddSignatureResponse,
  BridgeSignatureResponse,
  GetStatusResponse,
} from '../types'
import { useToast } from '../contexts/ToastContext/hooks'

export const useAccessToken = () => {
  const [loading, setLoading] = useState(true)
  const { address, chainId } = useAccount()
  const [error, setError] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
  const [mintLoading, setMintLoading] = useState<boolean>(false)
  const [bridgeLoading, setBridgeLoading] = useState<boolean>(false)

  const { showPendingToast, closeToast, showSuccessToast, showWarningToast } =
    useToast()

  useEffect(() => {
    if (address && chainId) {
      onGetStatus().then((res) => {
        if (res) {
          setIsAuthorized(res.status)
        }
      })
    }
  }, [address, chainId])

  const onAddSignature = async () => {
    setMintLoading(true)
    showPendingToast(undefined, 'Adding signature...')
    try {
      const response = await axios({
        method: 'POST',
        url: 'api/token/signature',
        data: {
          receiverAddress: address,
          expiresAt: Math.floor(Date.now() / 1000), // Current date in seconds
        },
      })

      showSuccessToast('Signature added successfully')
      return response.data as AddSignatureResponse
    } catch (error: any) {
      console.error(error)
      setError(error.message)
      showWarningToast(error.message)
    } finally {
      closeToast()
      setMintLoading(false)
    }
  }

  const onGetStatus = async () => {
    try {
      showPendingToast(undefined, 'Checking compliance status...')
      const response = await axios({
        method: 'GET',
        url: 'api/token/status',
        data: {
          walletAddress: address,
          targetChainId: chainId!,
        },
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
    setBridgeLoading(true)
    showPendingToast(undefined, 'Importing token...')
    try {
      const response = await axios({
        method: 'POST',
        url: 'api/token/signature',
        data: {
          receiverAddress: address, // address of wallet receiving AT
          expiresAt: Math.floor(Date.now() / 1000), // expiration timestamp in seconds
          targetChainId: chainId!, // chain id where AT will be minted
          sourceChainId, // chain id from where AT will be imported
        },
      })

      return response.data as BridgeSignatureResponse
    } catch (error: any) {
      console.error(error)
      setError(error.message)
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
  }
}
