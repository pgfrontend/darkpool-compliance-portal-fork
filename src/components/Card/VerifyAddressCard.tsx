import { Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import Ethereum from '../../../public/images/chain/ethereum.png'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import Verified from '../../../public/images/verified-icon.svg'
import { complianceVendorConfig } from '../../constants/complianceConfig'
import { dappConfig } from '../../constants/featureConfig'
import { useToast } from '../../contexts/ToastContext/hooks'
import { formatWalletHash } from '../../helpers'
import { ComplianceOnboardingVendor } from '../../types'
import { WarningAlert } from '../Alert/InfoAlert'
import { AlignedRow } from '../Box/AlignedRow'
import { ModalButton } from '../Button/ModalButton'
import {
  ContentBox,
  StyledCard,
  StyledComplianceChip,
} from './CompliancePortal'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { useCompliance } from '../../hooks/useCompliance'
import { supportedChains } from '../../constants/chains'

interface VerifyAddressCardProps {
  logout: () => void
  onVerify: (vendor: ComplianceOnboardingVendor) => void
  isLoading: boolean
  isCompliant: boolean | undefined
  onCheckCompliance: () => void
}

export const VerifyAddressCard = ({
  logout,
  onVerify,
  isLoading,
  isCompliant,
  onCheckCompliance,
}: VerifyAddressCardProps) => {
  const { address } = useAccount()
  const theme = useTheme()

  const { chainId } = useChainContext()

  const { showPendingToast } = useToast()

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
          alignItems='center'
        >
          <Image
            src={supportedChains[chainId!].icon}
            width={18}
            height={18}
            alt='chain-icon'
          />

          <Typography
            variant='body-md'
            fontWeight='600'
          >
            {address ? formatWalletHash(address) : ''}
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
          onClick={onCheckCompliance}
        />
      </AlignedRow>
      {isLoading ? (
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
            <CircularProgress size={80} />

            <Typography
              color='#77ED91'
              fontSize='16px'
              lineHeight='18px'
              fontWeight='600'
            >
              Checking compliance status on {supportedChains[chainId!].name}...
            </Typography>
          </Stack>
        </Box>
      ) : isCompliant ? (
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
              fontSize='16px'
              lineHeight='18px'
              fontWeight='600'
            >
              Your wallet address is compliant on {supportedChains[chainId!].name}.
            </Typography>
          </Stack>
        </Box>
      ) : (<>
        <Stack
          alignItems={'center'}
          borderRadius='4px'
        >
          <WarningAlert text='Your wallet address has not been verified yet, please verify your identity through KYC or KYB by choosing a platform below and verify again before you proceed!' />
        </Stack>
        {dappConfig[chainId!].complianceVendors.map(
          (
            vendor,
            index
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
            </StyledCard>
          )
        )}
      </>)}
    </ContentBox>
  )
}
