import { Stack, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'

import { writeContract } from '@wagmi/core'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ModalButton } from '../../components/Button/ModalButton'
import { ContentBox } from '../../components/Card/CompliancePortal'
import { StyledTextField } from '../../components/Input/StyledTextField'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { wagmiConfig } from '../../wagmi'


const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "setCompliance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const DebugPage: NextPage = () => {
  const { address } = useAccount()

  const { chainId } = useChainContext()

  // Add state for KYC address
  const [kycAddress, setKycAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const changeKycAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKycAddress(event.target.value.trim())
    setError('')
  }

  // Handle KYC setting
  const handleSetKYC = async () => {
    console.log('=====handleSetKYC', kycAddress)
    setError('')
    if (!kycAddress || !ethers.utils.isAddress(kycAddress)) {
      setError('Please enter a valid address')
      return
    }

    if (chainId !== 4898) {
      setError('Please connect to the AlphaSeaseed Testnet')
      return
    }

    setIsLoading(true)
    try {
      writeContract(wagmiConfig, {
        address: "0x54c375f28ce4B0c2B986D6256E4Bc75d242A8793",
        abi: ABI,
        functionName: 'setCompliance',
        args: [kycAddress, true]
      })

    } catch (error) {
      console.error('Error setting KYC:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Debug</title>
      </Head>

      <Layout title={'Debug'}>
        <ContentBox
          gap='24px'
          alignItems='flex-start'
          maxWidth={'720px'}
          style={{zIndex: 1000}}
        >
          <Stack
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            padding='6px 12px'
            bgcolor='#3D4C44'
            borderRadius='12px'
            width={'100%'}
            spacing={2}
          >
            <StyledTextField
              value={kycAddress}
              fullWidth
              disabled={false}
              aria-autocomplete={'none'}
              autoComplete="off"
              inputMode="decimal"
              placeholder="Wallet Address"
              onChange={changeKycAddress}
            />

            <ModalButton
              title='Set KYC Passed'
              onClick={handleSetKYC}
              disabled={!kycAddress || isLoading}
              loading={isLoading}
            />
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
        </ContentBox>

      </Layout>
    </div>
  )
}

export default DebugPage
