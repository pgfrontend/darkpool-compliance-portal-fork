import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Box,
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  IconButton,
  ModalProps,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { BasicModal } from '../Modal/BasicModal'
import { dappConfig } from '../../constants/featureConfig'
import { complianceVendorConfig } from '../../constants/complianceConfig'

const StyledComplianceButton = styled(Button)(() => {
  const theme = useTheme()

  return {
    color: theme.palette.primary.main,
    padding: '12px 20px',
    height: '42px',
  }
})

const StyledComplianceChip = styled(Chip)(() => {
  const theme = useTheme()

  return {
    color: theme.palette.secondary.main,
    height: '25px',
    backgroundColor: '#E4FBE9',
    borderRadius: '5250.731px',
    border: '0.525px solid #77ED91',
    padding: '6px 0px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase'
  }
});

const CompliancePaper = styled(Paper)(({ theme }) => ({
  borderRadius: '8px',
  border: '1px solid #77ED91',
  background: '#17181C',
  display: 'flex',
  padding: '16px 12px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '16px',
  alignSelf: 'stretch'
}));



export interface ComplianceOnboardingProp {
  openState: boolean
  onClose: () => void
  onVendor: (vendor: number) => void
}

export const ComplianceOnboardingModal: React.FC<ComplianceOnboardingProp> = ({
  openState,
  onClose,
  onVendor
}) => {
  const theme = useTheme()
  const { chainId } = useChainContext()

  const handleClose: ModalProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick')
      return
    onClose()
  }

  return (
    <BasicModal
      open={openState}
      onClose={handleClose}
      scroll={'paper'}
      maxWidth={'md'}
    >
      <DialogTitle id="tokenSelectionDialogTitle" sx={{ padding: '0px', mb: '16px', height: '23px' }}>
        <Stack width={'100%'} direction={'row'}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant='h4' color={theme.palette.common.white} width={"100%"}>
            Verify Your Identity
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              width: '24px',
              height: '24px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ width: '595px', padding: '0px' }}>
        <Box sx={{
          width: '100%',
          display: 'flex',
          padding: '16px 12px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '8px',
          alignSelf: 'stretch',
          borderRadius: '8px',
          background: '#2F3C35'
        }}>
          <Box></Box>
          <Stack width={'100%'} gap={theme.spacing(1)}>
            {dappConfig[chainId].complianceVendors.map((vendor) =>
            (
              <CompliancePaper
                key={vendor}
              >
                <Stack width={'100%'} direction={'column'} gap={theme.spacing(1)}>
                  <Stack direction={'row'} gap={theme.spacing(1)} alignItems={'center'}>
                    <Avatar sx={{ width: '32px', height: '32px' }}>
                      <img src={complianceVendorConfig[vendor].logo} width={'32px'} height={'32px'} />
                    </Avatar>
                    <Typography variant={'button-lg'} color={theme.palette.common.white}>
                      {complianceVendorConfig[vendor].name}
                    </Typography>
                    {complianceVendorConfig[vendor].isKyc && (
                      <StyledComplianceChip label={'KYC'} />
                    )}
                    {complianceVendorConfig[vendor].isKyb && (
                      <StyledComplianceChip label={'KYB'} />
                    )}
                  </Stack>
                  <Typography variant={'body-sm'} color={'#A4C0B2'}>
                    {complianceVendorConfig[vendor].description}
                  </Typography>
                  <Box>
                    <StyledComplianceButton
                      onClick={() => { onVendor(vendor) }}
                    >
                      <Typography variant="button" color={theme.palette.secondary.main}>
                        Verify on {complianceVendorConfig[vendor].name}
                      </Typography>
                    </StyledComplianceButton>
                  </Box>
                </Stack>
              </CompliancePaper>
            )
            )}
          </Stack>
        </Box>
      </DialogContent>
    </BasicModal>
  )
}
