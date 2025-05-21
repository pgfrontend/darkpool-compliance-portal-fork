import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { supportedChains } from '../../constants/chains'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { useToast } from '../../contexts/ToastContext/hooks'
import { formatWalletHash } from '../../helpers'
import { useCoinbaseEas } from '../../hooks/coinbaseEas/hook'
import { useKeyring } from '../../hooks/keyring/hook'
import { useAccessToken } from '../../hooks/useAccessToken'
import { useZkMe } from '../../hooks/zkme/hook'
import { ComplianceOnboardingVendor } from '../../types'
import { LoadingComplianceModal } from '../Modal/LoadingComplianceModal'
import { ContentBox } from './CompliancePortal'
import { CompliantCard } from './CompliantCard'
import { NotCompliantCard } from './NotCompliantCard'

interface VerifyAddressCardProps {
  logout: () => void
}

export const VerifyAddressCard = ({ logout }: VerifyAddressCardProps) => {
  const { address } = useAccount()
  const theme = useTheme()
  const [openInProgress, setOpenInProgress] = useState(false)

  const { chainId } = useChainContext()
  const {
    isAuthorized,
    isCompliant,
    mintRequired,
    onGetStatus,
    onAddSignature,
    onBridgeSignature,
    isGetStatusLoading,
    mintLoading,
    bridgeLoading,
    expiresAt,
  } = useAccessToken()

  const onCheckCompliance = () => {
    onGetStatus()
  }

  const closeModalAndRefresh = async () => {
    setOpenInProgress(false)
    await onCheckCompliance()
  }

  const { launchWidget: launchZKmeWidget, loading: zkLoading } = useZkMe(
    address,
    chainId
  )

  const { launchEas } = useCoinbaseEas()

  const { launchKeyring } = useKeyring(chainId)

  const onVerify = async (
    vendor: ComplianceOnboardingVendor,
    email?: string
  ) => {
    if (!address) {
      return
    }

    switch (vendor) {
      case ComplianceOnboardingVendor.KEYRING:
        setOpenInProgress(true)
        launchKeyring()
        break
      case ComplianceOnboardingVendor.ZKME:
        setOpenInProgress(true)
        await launchZKmeWidget()
        break
      case ComplianceOnboardingVendor.COINBASE_EAS:
        setOpenInProgress(true)
        launchEas()
        break
      default:
        return
    }
  }

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

      {isGetStatusLoading ? (
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
          onCheckCompliance={onCheckCompliance}
          onMintToken={onAddSignature}
          onBridgeToken={onBridgeSignature}
          mintLoading={mintLoading}
          bridgeLoading={bridgeLoading}
          isAuthorized={isAuthorized}
          expiresAt={expiresAt}
        />
      ) : (
        <NotCompliantCard
          onBridgeToken={onBridgeSignature}
          onVerify={onVerify}
          onCheckCompliance={onCheckCompliance}
        />
      )}
      <LoadingComplianceModal
        open={openInProgress}
        onClose={() => {}}
        doRefresh={closeModalAndRefresh}
      >
        <></>
      </LoadingComplianceModal>
    </ContentBox>
  )
}
