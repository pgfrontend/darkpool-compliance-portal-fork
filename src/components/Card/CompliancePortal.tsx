import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import { WarningAlert } from '../Alert/InfoAlert'
import MetaMask from '../../../public/images/wallets/metamask.svg'
import WalletConnect from '../../../public/images/wallets/walletconnect.svg'
import CoinbaseWallet from '../../../public/images/wallets/coinbase.svg'
import Ethereum from '../../../public/images/chain/ethereum.png'
import Keyring from '../../../public/images/compliance/key-ring.svg'
import Quadrata from '../../../public/images/compliance/quadrata.png'
import zkMe from '../../../public/images/compliance/zkMe.png'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import Disconnect from '../../../public/images/disconnect-icon.svg'
import Verified from '../../../public/images/verified-icon.svg'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import { formatWalletHash } from '../../helpers'
import { set } from 'lodash'

const complianceConfig = {
  1: [
    {
      name: 'KEYRING',
      logo: Keyring.src,
      description:
        'Full suite of permissioning solutions for blockchain protocols powered by zero-knowledge privacy.',
      isKyc: true,
      isKyb: true,
    },
    {
      name: 'QUADRATA',
      logo: Quadrata.src,
      description:
        'Quadrata provides both Know Your Customer (KYC) and Know Your Business (KYB) solutions as part of its Web3 identity verification platform.',
      isKyc: true,
      isKyb: true,
    },
    {
      name: 'zkMe',
      logo: zkMe.src,
      description:
        'zkMe offers KYC services using Identity Oracles powered by zero-knowledge proofs, ensuring secure, self-sovereign, and private credential verifications.',
      isKyc: true,
      isKyb: false,
    },
  ],
}
const connectButtons = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: MetaMask,
    connector: metaMask(),
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: WalletConnect,
    connector: walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ?? '',
      showQrModal: true,
    }),
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: CoinbaseWallet,
    connector: coinbaseWallet({ appName: 'Singularity' }),
  },
]
const CompliancePortal: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isVerified, setIsVerified] = useState(false)
  const { connect } = useConnect()
  const { chainId, address } = useAccount()
  const theme = useTheme()

  const handleConnectButton = () => {
    setStep(2)
  }

  const handleVerify = () => {
    setIsVerified(true)
  }

  useEffect(() => {
    if (address) {
      setStep(3)
    }
  }, [chainId, address])

  const { disconnect } = useDisconnect()
  const logout = () => {
    disconnect()
    setStep(1)
  }

  const complianceRender = () => {
    switch (step) {
      case 1:
        return (
          <ContentBox
            maxWidth='480px'
            gap='32px'
          >
            <Typography
              fontSize='32px'
              lineHeight='41px'
              fontWeight='700'
              letterSpacing='-1.5%'
            >
              Verify your identity
            </Typography>

            <Typography
              fontSize='20px'
              lineHeight='30px'
              fontWeight='400'
              letterSpacing='-1.5%'
              color='#8DB09F'
            >
              This portal helps you verify your crypto wallet address for
              KYC/KYB compliance, Ensure your transactions are always secure and
              compliant!
            </Typography>

            <Button
              variant='contained'
              color='primary'
              onClick={handleConnectButton}
              sx={{
                width: '100%',
                height: '48px',
                padding: '10px 20px',
                lineHeight: '20px',
                fontSize: '18px',
                textTransform: 'uppercase',
                borderRadius: '50px',
              }}
            >
              Connect Wallet
            </Button>
          </ContentBox>
        )
      case 2:
        return (
          <ContentBox
            maxWidth='480px'
            gap='32px'
            paddingBottom='64px'
          >
            <Stack
              direction='row'
              gap='8px'
            >
              <Box></Box>
              <Typography
                fontSize='24px'
                lineHeight='27px'
                fontWeight='700'
                letterSpacing='-1.5%'
              >
                Select a wallet to connect
              </Typography>
            </Stack>

            <Stack
              gap='8px'
              width='100%'
            >
              {connectButtons.map((button, index) => (
                <Button
                  key={button.id}
                  variant='contained'
                  onClick={() => {
                    connect({
                      chainId,
                      connector: button.connector,
                    })
                  }}
                  sx={{
                    width: '100%',
                    padding: '16px',
                    lineHeight: '20px',
                    fontSize: '18px',
                    borderRadius: '50px',
                    bgcolor: '#17181C',
                    border: '1px solid #1D5A2B',
                    color: '#FFF',
                    transition: '0.3s ease',
                    ':hover': {
                      border: '1px solid #92F1A7',
                      bgcolor: '#92F1A7',
                      color: '#000',
                    },
                  }}
                >
                  <Stack
                    direction='row'
                    gap='8px'
                    alignItems='center'
                  >
                    <Image
                      src={button.icon.src}
                      width={32}
                      height={32}
                      alt={button.name}
                    />
                    {button.name}
                  </Stack>
                </Button>
              ))}
            </Stack>
          </ContentBox>
        )

      case 3:
        return (
          <ContentBox
            maxWidth='720px'
            gap='24px'
            alignItems='flex-start!important'
          >
            <Typography
              fontSize='24px'
              lineHeight='27px'
              fontWeight='700'
              letterSpacing='-1.5%'
            >
              Your wallet address
            </Typography>

            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              padding='6px 12px'
              bgcolor='#3D4C44'
              borderRadius='12px'
              width={'100%'}
            >
              <Stack
                direction='row'
                gap='8px'
                bgcolor='#576E63'
                borderRadius='100px'
                padding={'6px 8px'}
              >
                <Image
                  src={Ethereum.src}
                  width={18}
                  height={18}
                  alt='chain-icon'
                />

                <Typography
                  variant='body-md'
                  fontWeight='600'
                >
                  {formatWalletHash(address!)}
                </Typography>
              </Stack>

              <Typography
                variant='body-xs'
                color={theme.palette.primary.main}
                fontWeight='600'
                sx={{
                  cursor: 'pointer',
                }}
              >
                Verify again
              </Typography>
            </Stack>

            <Typography
              fontSize='24px'
              lineHeight='27px'
              fontWeight='700'
              letterSpacing='-1.5%'
            >
              Verify your wallet address
            </Typography>

            {isVerified && (
              <Box
                padding='32px'
                bgcolor='#3D4C44'
                borderRadius='12px'
                width='100%'
                maxWidth='647px'
              >
                <Stack
                  gap='24px'
                  alignItems='center'
                >
                  <Image
                    src={Verified.src}
                    width={80}
                    height={80}
                    alt='chain-icon'
                  />

                  <Typography
                    color='#77ED91'
                    fontSize='12px'
                    lineHeight='18px'
                    fontWeight='600'
                  >
                    Your wallet address has been verified
                  </Typography>
                </Stack>
              </Box>
            )}
            {!isVerified && (
              <Stack
                alignItems={'center'}
                borderRadius='4px'
              >
                <WarningAlert text='Your wallet address has not been verified yet, please verify your identity through KYC or KYB by choosing a platform below and verify again before you proceed!' />
              </Stack>
            )}
            {!isVerified &&
              complianceConfig[1].map(
                (
                  vendor,
                  index // TODO: replace 1 with Chain id
                ) => (
                  <StyledCard key={index}>
                    <Stack
                      direction='row'
                      gap='8px'
                      alignItems='center'
                    >
                      <Image
                        src={vendor.logo}
                        width={32}
                        height={32}
                        alt='chain-icon'
                      />
                      <Typography
                        fontSize='18px'
                        lineHeight='24px'
                        fontWeight='600'
                        letterSpacing='-1.5%'
                      >
                        {vendor.name}
                      </Typography>
                      <StyledComplianceChip label='KYC' />
                      <StyledComplianceChip label='KYB' />
                    </Stack>

                    <Typography
                      variant='body-sm'
                      color='#17181C'
                      textAlign='left'
                    >
                      {vendor.description}
                    </Typography>

                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleVerify}
                      sx={{
                        width: 'fit-content',
                        padding: '10px',
                        lineHeight: '16px',
                        fontSize: '14px',
                        borderRadius: '50px',
                      }}
                    >
                      <Stack
                        direction='row'
                        gap='8px'
                        alignItems='center'
                      >
                        Verify by {vendor.name}
                        <Image
                          src={ExternalLink.src}
                          width={18}
                          height={18}
                          alt='external-link-icon'
                        />
                      </Stack>
                    </Button>
                  </StyledCard>
                )
              )}

            <Button
              variant='contained'
              sx={{
                width: '100%',
                height: '48px',
                padding: '10px 20px',
                lineHeight: '20px',
                fontSize: '18px',
                textTransform: 'uppercase',
                borderRadius: '50px',
                bgcolor: '#E4FBE9',
              }}
              onClick={logout}
            >
              <Stack
                direction='row'
                gap='8px'
                alignItems='center'
              >
                <Image
                  src={Disconnect.src}
                  width={24}
                  height={24}
                  alt='disconnect-icon'
                />
                Disconnect
              </Stack>
            </Button>
          </ContentBox>
        )

      default:
        break
    }
  }
  return (
    <StyledBox>
      <Typography
        fontSize='52px'
        lineHeight='64px'
        fontWeight='700'
        letterSpacing='-1.5%'
        textAlign='center'
      >
        Compliance Portal
      </Typography>
      {complianceRender()}
    </StyledBox>
  )
}

export default CompliancePortal

export const StyledBox = styled(Box)(({ theme }) => {
  return {
    boxShadow: 'none',
    width: '100%',
    minHeight: '265px',
    color: 'white',
    zIndex: 10,
    // background: theme.palette.secondary.main,
  }
})

export const ContentBox = styled(Box)(() => {
  return {
    width: '100%',
    backgroundColor: '#17181C',
    textAlign: 'center',
    padding: '32px',
    border: '1px solid #576e63',
    borderRadius: '12px',
    margin: '24px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

const WalletBox = styled(Box)(() => {
  return {
    width: '100%',
    maxWidth: '720px',
    backgroundColor: '#17181C',
    padding: '32px',
    border: '1px solid #576e63',
    borderRadius: '12px',
    margin: '24px auto',

    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }
})

const StyledCard = styled(Card)(() => {
  return {
    width: '100%',
    border: '1px solid #D1DFD9',
    borderRadius: '8px',
    padding: '16px',

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }
})

const StyledComplianceChip = styled(Chip)(() => {
  return {
    height: '25px',
    backgroundColor: '#E4FBE9',
    borderRadius: '5250.731px',
    border: '0.525px solid #77ED91',
    padding: '6px 0px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
  }
})
