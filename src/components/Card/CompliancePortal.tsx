import {
  Box,
  Card,
  Chip,
  styled,
  Typography
} from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'


import { useAccount, useDisconnect } from 'wagmi'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { useToast } from '../../contexts/ToastContext/hooks'
import { useCoinbaseEas } from '../../hooks/coinbaseEas/hook'
import { useCompliance } from '../../hooks/useCompliance'
import { useZkMe } from '../../hooks/zkme/hook'
import { ComplianceOnboardingVendor } from '../../types'
import { LoadingComplianceModal } from '../Modal/LoadingComplianceModal'
import { AnnounceCard } from './AnnounceCard'
import { ConnectWalletCard } from './ConnectWalletCard'
import { VerifyAddressCard } from './VerifyAddressCard'
import { useKeyring } from '../../hooks/keyring/hook'
import { useSynaps } from '../../hooks/synaps/hook'

const StepEnum = {
  NOT_CONNECTED: 1,
  CONNECTING: 2,
  CONNECTED: 3,
}


const CompliancePortal: React.FC = () => {
  const [step, setStep] = useState(StepEnum.NOT_CONNECTED)
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const { chainId } = useChainContext()
  const { isNotCompliant, isLoading, isCompliant, onCheckCompliance } =
    useCompliance()
  const { showPendingToast, closeToast } = useToast()

  const [showQuadrata, setShowQuadrata] = useState(false)
  const [quadrataAccessToken, setQuadrataAccessToken] = useState<string>()
  const [quadrataWidget, setQuadrataWidget] = useState<ReactNode>()
  const [openInProgress, setOpenInProgress] = useState(false)

  const { launchSynaps } = useSynaps(chainId)

  const handleConnectButton = () => {
    setStep(StepEnum.CONNECTING)
  }

  const logout = () => {
    disconnect()
    setStep(StepEnum.NOT_CONNECTED)
  }

  const closeModalAndRefresh = async () => {
    setOpenInProgress(false)
    await onCheckCompliance()
  }

  useEffect(() => {
    if (!isConnected) {
      setStep(StepEnum.NOT_CONNECTED)
    }

    if (address && isConnected) {
      setStep(StepEnum.CONNECTED)
    }

    if (isConnected && isCompliant) {
      setOpenInProgress(false)
    } else {
    }

    if (isLoading && isNotCompliant) {
      showPendingToast(undefined, 'Compliance checking')
    }

    if (!isLoading) {
      closeToast()
    }
  }, [chainId, address, isConnected, isLoading, isCompliant])

  const onQuadrataClose = () => {
    console.log('Quadrata KYB widget closed')
    setShowQuadrata(false)
    setQuadrataAccessToken(undefined)
    setQuadrataWidget(undefined)
    onCheckCompliance()
  }

  const { launchWidget: launchZKmeWidget, loading: zkLoading } = useZkMe(
    address,
    chainId
  )

  const { launchEas } = useCoinbaseEas()

  const { launchKeyring } = useKeyring(chainId)

  const onVerify = async (vendor: ComplianceOnboardingVendor) => {
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
      case ComplianceOnboardingVendor.SYNAPS:
        launchSynaps(
          address,
          () => {
            setOpenInProgress(true)
          },
          () => {
            setOpenInProgress(true)
          }
        )
        break
      default:
        return
    }
  }

  const complianceRender = () => {
    switch (step) {
      case StepEnum.NOT_CONNECTED:
        return <AnnounceCard onClick={handleConnectButton} />
      case StepEnum.CONNECTING:
        return <ConnectWalletCard />
      case StepEnum.CONNECTED:
        return (
          <VerifyAddressCard
            logout={logout}
            onVerify={onVerify}
            isLoading={isLoading}
            isCompliant={isCompliant}
            onCheckCompliance={onCheckCompliance}
          />
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

      {showQuadrata && quadrataAccessToken && quadrataWidget && (
        <Box>{quadrataWidget}</Box>
      )}

      <LoadingComplianceModal
        open={openInProgress && !showQuadrata}
        onClose={() => { }}
        doRefresh={closeModalAndRefresh}
      >
        <></>
      </LoadingComplianceModal>
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

export const StyledCard = styled(Card)(() => {
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

export const StyledComplianceChip = styled(Chip)(() => {
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
