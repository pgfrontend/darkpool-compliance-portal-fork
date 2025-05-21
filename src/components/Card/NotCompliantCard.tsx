import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import { supportedChains } from '../../constants/chains'
import { complianceVendorConfig } from '../../constants/complianceConfig'
import { dappConfig } from '../../constants/featureConfig'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { ComplianceOnboardingVendor } from '../../types'
import { WarningAlert } from '../Alert/InfoAlert'
import { ModalButton } from '../Button/ModalButton'
import { NetworkDropdown } from '../Dropdowns/NetworkDropdown'
import { StyledTextField } from '../Input/StyledTextField'
import { StyledCard, StyledComplianceChip } from './CompliancePortal'

interface NotCompliantCardProps {
  onVerify: (vendor: ComplianceOnboardingVendor, email?: string) => void
  onCheckCompliance: () => void
  onBridgeToken: (sourceChainId: number) => void
}

export const NotCompliantCard = ({
  onVerify,
  onCheckCompliance,
  onBridgeToken,
}: NotCompliantCardProps) => {
  const { chainId } = useChainContext()
  const theme = useTheme()
  const [sourceChainId, setSourceChainId] = useState<number | null>(null)
  const { address } = useAccount()

  const currentChainConfig = supportedChains[chainId]

  const onSelectSourceChain = (chainId: number) => {
    setSourceChainId(chainId)
  }

  const [email, setEmail] = useState<string>('')

  const onBridge = () => {
    if (sourceChainId) {
      onBridgeToken(sourceChainId)
    }
  }

  return (
    <Grid
      container
      alignItems={'stretch'}
    >
      <Grid
        item
        xs={5.5}
      >
        <Stack
          spacing={theme.spacing(1)}
          sx={{
            background: theme.palette.other.neutral.n100,
            border: `1px solid ${theme.palette.primary.main}`,
            padding: '16px',
            borderRadius: '8px',
            height: '100%',
          }}
        >
          <Stack
            direction={'row'}
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant='heading-2xl'>
              Verify your wallet address
            </Typography>

            {/* Refresh Button */}
            <RefreshIcon
              sx={{
                fill: theme.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={onCheckCompliance}
            />
          </Stack>
          <Stack
            alignItems={'center'}
            borderRadius='4px'
          >
            <WarningAlert text='Your wallet address has not been verified yet, please verify your identity through KYC or KYB by choosing a platform below and verify again before you proceed!' />
          </Stack>
          {dappConfig[chainId!].complianceVendors.map((vendor, index) => (
            <StyledCard key={index}>
              <Stack
                width={'100%'}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
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
              </Stack>

              <Typography
                variant='body-sm'
                color='#17181C'
                textAlign='left'
              >
                {complianceVendorConfig[vendor].description}
              </Typography>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() =>
                    email === '' ? onVerify(vendor) : onVerify(vendor, email)
                  }
                  sx={{
                    width: 'fit-content',
                    padding: '10px',
                    lineHeight: '16px',
                    fontSize: '14px',
                    borderRadius: '50px',
                  }}
                  disabled={
                    !(email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
                  }
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
              </Stack>
            </StyledCard>
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        xs={1}
      >
        <Stack
          height={'100%'}
          justifyContent={'center'}
        >
          <Typography
            variant='heading-2xl'
            color={'white'}
          >
            or
          </Typography>
        </Stack>
      </Grid>

      <Grid
        item
        xs={5.5}
      >
        <Stack
          sx={{
            background: theme.palette.other.neutral.n100,
            border: `1px solid ${theme.palette.primary.main}`,
            padding: '16px',
            borderRadius: '8px',
            height: '100%',
          }}
        >
          <Typography variant='heading-2xl'>
            Bridge Compliance Status
          </Typography>
          <Typography
            variant='body-xs'
            fontWeight={600}
            mt={'16px'}
          >
            Have passed KYC/KYB on another chain?
          </Typography>

          {/* Box */}
          <Box
            sx={{
              background: 'white',
              borderRadius: '12px',
              border: `1px solid ${theme.palette.other.neutral.n700}`,
              padding: '16px',
              height: '100%',
              marginTop: '32px',
            }}
          >
            <Box
              sx={{
                background: theme.palette.other.primary.p950,
                borderRadius: '12px',
                border: `1px dashed rgba(56, 78, 183, 0.30)`,
                padding: '20px 12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Typography
                variant='body-md'
                color={'black'}
                fontWeight={600}
              >
                Bridge Compliance Status from
              </Typography>

              <NetworkDropdown onSelect={onSelectSourceChain} />

              <Typography
                variant='body-md'
                color={'black'}
                fontWeight={600}
              >
                To
              </Typography>

              <Stack
                direction={'row'}
                spacing={theme.spacing(1)}
                alignItems={'center'}
                sx={{
                  background: theme.palette.other.neutral.n200,
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '9999px',
                  padding: '12px 20px',
                }}
              >
                <Image
                  width={24}
                  height={24}
                  src={currentChainConfig.icon}
                  alt=''
                />
                <Typography
                  variant='button-sm'
                  color={'white'}
                >
                  {currentChainConfig.name}
                </Typography>
              </Stack>

              <ModalButton
                title='Bridge'
                onClick={onBridge}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
