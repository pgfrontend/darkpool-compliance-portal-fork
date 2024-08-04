import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import {
  ContentBox,
  StyledCard,
  StyledComplianceChip,
} from './CompliancePortal'
import Image from 'next/image'
import Ethereum from '../../../public/images/chain/ethereum.png'
import { useAccount, useDisconnect } from 'wagmi'
import { formatWalletHash } from '../../helpers'
import { useState } from 'react'
import Verified from '../../../public/images/verified-icon.svg'
import { WarningAlert } from '../Alert/InfoAlert'
import Keyring from '../../../public/images/compliance/key-ring.svg'
import Quadrata from '../../../public/images/compliance/quadrata.png'
import zkMe from '../../../public/images/compliance/zkMe.png'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import Disconnect from '../../../public/images/disconnect-icon.svg'
import { useComplianceCheck } from '../../hooks/keyring/hook'
import { useQuadrata } from '../../hooks/quadrata/hook'
import { useZkMe } from '../../hooks/zkme/hook'
import { useToast } from '../../contexts/ToastContext/hooks'
import { dappConfig } from '../../constants/featureConfig'
import { ComplianceOnboardingVendor } from '../../types'
import { complianceVendorConfig } from '../../constants/complianceConfig'
import { ComplianceOnboardingButton } from '../Button/ComplianceOnboardingButton'
import { AlignedRow } from '../Box/AlignedRow'
import { ModalButton } from '../Button/ModalButton'

interface VerifyAddressCardProps {
  logout: () => void
  verifyAgain: () => void
  verified: boolean
  onVerify: (vendor: ComplianceOnboardingVendor) => void
}

export const VerifyAddressCard = ({
  logout,
  verifyAgain,
  verified,
  onVerify,
}: VerifyAddressCardProps) => {
  const { address, chainId } = useAccount()
  const theme = useTheme()

  const { showPendingToast } = useToast()

  // const onSuccess = () => {
  //   setIsVerified(true)
  // }

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
          onClick={logout}
        >
          Disconnect
        </Typography>
      </Stack>

      <AlignedRow width={'100%'}>
        <Typography
          fontSize='24px'
          lineHeight='27px'
          fontWeight='700'
          letterSpacing='-1.5%'
        >
          Verify your wallet address
        </Typography>
        <ModalButton
          title='Refresh'
          onClick={verifyAgain}
        />
      </AlignedRow>

      {verified && (
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
      {!verified && (
        <Stack
          alignItems={'center'}
          borderRadius='4px'
        >
          <WarningAlert text='Your wallet address has not been verified yet, please verify your identity through KYC or KYB by choosing a platform below and verify again before you proceed!' />
        </Stack>
      )}
      {!verified &&
        dappConfig[chainId!].complianceVendors.map(
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
                  src={complianceVendorConfig[vendor].logo}
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
                  {complianceVendorConfig[vendor].name}
                </Typography>
                {complianceVendorConfig[vendor].isKyc && (
                  <StyledComplianceChip label='KYC' />
                )}
                {complianceVendorConfig[vendor].isKyb && (
                  <StyledComplianceChip label='KYB' />
                )}
              </Stack>

              <Typography
                variant='body-sm'
                color='#17181C'
                textAlign='left'
              >
                {complianceVendorConfig[vendor].description}
              </Typography>

              <Button
                variant='contained'
                color='primary'
                onClick={() => onVerify(vendor)}
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
                  Verify by {complianceVendorConfig[vendor].name}
                  <Image
                    src={ExternalLink.src}
                    width={18}
                    height={18}
                    alt='external-link-icon'
                  />
                </Stack>
              </Button>
              {/* <Box width={'200px'}>
                <ComplianceOnboardingButton
                  loading={false}
                  disabled={false}
                  title={`Verify by ${complianceVendorConfig[vendor].name}`}
                />
              </Box> */}
            </StyledCard>
          )
        )}

      {/* <Button
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
      </Button> */}
    </ContentBox>
  )
}
