import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { isAddressCompliance } from '../services/complianceService'

export const useComplianceCheck = (
  address: string | undefined,
  chainId: number | undefined
) => {
  const [loading, setLoading] = useState(false)
  const [isCompliant, setIsCompliant] = useState<boolean>()
  const isNotCompliant = isCompliant === false

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsCompliant(true)
      return
    }

    if (address && ethers.utils.isAddress(address) && chainId) {
      setLoading(true)
      isAddressCompliance(address, chainId)
        .then((isCompliant) => {
          setIsCompliant(isCompliant)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setIsCompliant(undefined)
    }
  }, [address, chainId])

  const onCheckCompliance = () => {
    if (address && ethers.utils.isAddress(address) && chainId) {
      setLoading(true)
      isAddressCompliance(address, chainId)
        .then((isCompliant) => {
          setIsCompliant(isCompliant)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return { loading, isCompliant, isNotCompliant, onCheckCompliance }
}

export const useCompliance = () => {
  const chainId = useChainId()
  const { address } = useAccount()
  const {
    isCompliant,
    isNotCompliant,
    loading: checkLoading,
    onCheckCompliance,
  } = useComplianceCheck(address, chainId)

  return {
    isCompliant,
    isNotCompliant,
    isLoading: checkLoading,
    onCheckCompliance,
  }
}
