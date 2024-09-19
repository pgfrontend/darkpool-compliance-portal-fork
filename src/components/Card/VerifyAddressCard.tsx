import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import Ethereum from '../../../public/images/chain/ethereum.png'
import ExternalLink from '../../../public/images/external-link-icon.svg'
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
import { NotCompliantCard } from './NotCompliantCard'
import { CompliantCard } from './CompliantCard'
import { useAccessToken } from '../../hooks/useAccessToken'

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
  const {
    isAuthorized,
    loading,
    onAddSignature,
    onBridgeSignature,
    mintLoading,
    bridgeLoading,
  } = useAccessToken()

  return (
    <ContentBox
      gap='24px'
      alignItems='flex-start!important'
      maxWidth={isCompliant ? '720px' : '1100px'}
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

      {isLoading ? (
        <Box
          padding='32px'
          bgcolor='#3D4C44'
          borderRadius='12px'
          width='100%'
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
        <CompliantCard
          loading={loading}
          onCheckCompliance={onCheckCompliance}
          onMintToken={onAddSignature}
          onBridgeToken={onBridgeSignature}
          mintLoading={mintLoading}
          bridgeLoading={bridgeLoading}
          isAuthorized={isAuthorized}
        />
      ) : (
        <NotCompliantCard
          onBridgeToken={onBridgeSignature}
          onVerify={onVerify}
          onCheckCompliance={onCheckCompliance}
        />
      )}
    </ContentBox>
  )
}
