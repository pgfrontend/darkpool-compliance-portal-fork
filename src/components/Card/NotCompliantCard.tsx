import { Button, Stack, Typography } from '@mui/material'
import { WarningAlert } from '../Alert/InfoAlert'
import { dappConfig } from '../../constants/featureConfig'
import { useAccount } from 'wagmi'
import { StyledCard, StyledComplianceChip } from './CompliancePortal'
import Image from 'next/image'
import { complianceVendorConfig } from '../../constants/complianceConfig'
import ExternalLink from '../../../public/images/external-link-icon.svg'
import { ComplianceOnboardingVendor } from '../../types'

interface NotCompliantCardProps {
  onVerify: (vendor: ComplianceOnboardingVendor) => void
}

export const NotCompliantCard = ({ onVerify }: NotCompliantCardProps) => {
  const { chainId } = useAccount()
  return (
    <>
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
    </>
  )
}
