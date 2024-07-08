import { Button, Stack, Typography } from '@mui/material';
import React, { ReactElement, ReactNode, useState } from 'react';
import { useAccount } from 'wagmi';
import theme from '../../theme';
import { ComplianceOnboardingModal } from '../Compliance/ComplianceOnboardingModal';
import { useZkMe } from '../../hooks/zkme/hook';
import { useChainContext } from '../../contexts/ChainContext/hooks';
import { useQuadrata } from '../../hooks/quadrata/hook';
import { ComplianceOnboardingType, ComplianceOnboardingVendor } from '../../types';
import { dappConfig } from '../../constants/featureConfig';
import { useModal } from '@keyringnetwork/frontend-sdk';

export interface ComplianceOnboardingProps {
    loading: boolean
    disabled: boolean
    title: string
    onClick?: () => void
    userAddress?: string
}

export const ComplianceOnboardingButton: React.FC<ComplianceOnboardingProps> = ({
    loading,
    disabled,
    title,
    onClick,
}) => {

    const { chainId } = useChainContext()
    const { address } = useAccount()
    const [showModal, setShowModal] = useState(false)
    
    const { openModal: openKeyringModal } = useModal()
    
    const { launchWidget: launchZKmeWidget } = useZkMe(address, chainId)
    
    const [showQuadrata, setShowQuadrata] = useState(false)
    const [quadrataAccessToken, setQuadrataAccessToken] = useState<string>()
    const [quadrataWidget, setQuadrataWidget] = useState<ReactNode>()

    const onQuadrataClose = () => {
        console.log('Quadrata KYB widget closed')
        setShowQuadrata(false)
        setQuadrataAccessToken(undefined)
        setQuadrataWidget(undefined)
    }

    const { getAccessToken, createQuadrataWidget } = useQuadrata(address, chainId, onQuadrataClose)


    const onVendor = async (vendor: number) => {
        setShowModal(false)
        if (vendor === ComplianceOnboardingVendor.ZKME) {
            await launchZKmeWidget()
        } else if (vendor === ComplianceOnboardingVendor.QUADRATA) {
            const accessToken = await getAccessToken()
            setQuadrataAccessToken(accessToken)
            setQuadrataWidget(createQuadrataWidget(accessToken, chainId))
            setShowQuadrata(true)
        }
    }

    const onModalClose = () => {
        console.log('Modal closed')
        setShowModal(false)
    }

    const createComplianceOnboardingModal = () => {
        return (
            <ComplianceOnboardingModal
                onClose={onModalClose}
                openState={showModal}
                onVendor={onVendor}
            />
        )
    }

    const doOnboarding = () => {
        setQuadrataAccessToken(undefined)
        setQuadrataWidget(undefined)
        if (dappConfig[chainId].complianceType === ComplianceOnboardingType.SINGLE) {
            if (dappConfig[chainId].complianceVendors.includes(ComplianceOnboardingVendor.KEYRING)) {
                openKeyringModal()
            }
        } else {
            setShowModal(true)
        }
    }

    return (
        <>
            <Button
                type="submit"
                onClick={doOnboarding}
                variant="contained"
                disableRipple
                sx={{
                    textTransform: 'none',
                    width: '100%',
                    height: '60px',
                    padding: '12px, 20px',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    gap: 2,
                    background: '#B45309',
                    '&:hover': {
                        backgroundColor: '#F59E0B',
                        color: 'white',
                    },
                }}
            >
                <Stack direction={'row'} spacing={1}>
                    <Typography
                        sx={{
                            color: theme.palette?.other.neutral.n950,
                            textAlign: 'center',
                            fontSize: '17px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: '22px',
                            letterSpacing: '-0.07px',
                        }}
                    >
                        Verify your identity
                    </Typography>
                </Stack>
            </Button>
            {showModal && createComplianceOnboardingModal()}
            {showQuadrata && quadrataAccessToken && quadrataWidget && <>{quadrataWidget}</>}
        </>
    )
}
