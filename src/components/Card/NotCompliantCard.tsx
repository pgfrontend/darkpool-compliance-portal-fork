import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import { WarningAlert } from '../Alert/InfoAlert'
import { dappConfig } from '../../constants/featureConfig'
import { useAccount } from 'wagmi'
import { StyledCard, StyledComplianceChip } from './CompliancePortal'
import Image from 'next/image'
import { complianceVendorConfig } from '../../constants/complianceConfig'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import { ComplianceOnboardingVendor } from '../../types'
import { AlignedRow } from '../Box/AlignedRow'
import { ModalButton } from '../Button/ModalButton'
import { backgrounds, borderRadius } from 'polished'
import { NetworkDropdown } from '../Dropdowns/NetworkDropdown'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useState } from 'react'

interface NotCompliantCardProps {
  onVerify: (vendor: ComplianceOnboardingVendor) => void
  onCheckCompliance: () => void
  onBridgeToken: (sourceChainId: number) => void
}

export const NotCompliantCard = ({
  onVerify,
  onCheckCompliance,
  onBridgeToken,
}: NotCompliantCardProps) => {
  const { chainId } = useAccount()
  const theme = useTheme()
  const [sourceChainId, setSourceChainId] = useState<number | null>(null)

  const onSelectSourceChain = (chainId: number) => {
    setSourceChainId(chainId)
  }

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
            Have access token on other chain?
          </Typography>
          <Typography
            variant='body-xs'
            fontWeight={600}
            mt={'16px'}
          >
            Have access token on other chain?
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
                Select another chain
              </Typography>

              <NetworkDropdown onSelect={onSelectSourceChain} />

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
