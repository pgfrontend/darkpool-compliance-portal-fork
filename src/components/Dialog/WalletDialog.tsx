import { Box, Button, Link, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Config, useConnect, useConnectors } from 'wagmi'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { ConnectData } from 'wagmi/query'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { Wallet } from '../Icon'
import { BasicModal } from '../Modal/BasicModal'
import { WalletButton } from '../Wallet/WalletButton'
import { BasicDialogProps } from './model'
import coinbaseImg from '/public/images/wallets/coinbase.svg'
import metamaskImg from '/public/images/wallets/metamask.svg'
import walletconnectImg from '/public/images/wallets/walletconnect.svg'


const WALLET_CONNECT = {
  id: 'walletconnect',
  name: 'WalletConnect  ',
  icon: walletconnectImg,
  connector: walletConnect({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ?? '',
    showQrModal: true,
  }),
}

const COINBASE = {
  id: 'coinbase',
  name: 'Coinbase Wallet',
  icon: coinbaseImg,
  connector: coinbaseWallet({ appName: 'Singularity' }),

}

const PARTIAL_METAMASK = {
  id: 'metamask',
  name: 'MetaMask       ',
  icon: metamaskImg,
}

export const WalletDialog: React.FC<BasicDialogProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme()
  const { connect } = useConnect()
  const { chainId } = useChainContext()

  const wagmiConnectors = useConnectors()
  const metaMaskConnector = wagmiConnectors.find((connector) => connector.id === 'io.metamask')

  const [connectors, setConnectors] = useState<any[]>([WALLET_CONNECT, COINBASE])

  useEffect(() => {
    if (metaMaskConnector) {
      const newMetaMask = {
        ...PARTIAL_METAMASK,
        connector: metaMaskConnector,
      }
      setConnectors([newMetaMask, WALLET_CONNECT, COINBASE])
    }
  }, [metaMaskConnector])

  const postConnect = async (data:ConnectData<Config>) => {
    console.log('connected')
  }

  return (
    <BasicModal open={open} onClose={onClose}>
      <Stack width={'100%'} gap={theme.spacing(4)}>
        <Box width={'600px'}>
          <Typography
            variant="h3"
            color={theme.palette.common.white}
          >
            CONNECT WALLET
          </Typography>
        </Box>
        <Stack gap={theme.spacing(2)} >
          {connectors.map((connector) => (
            <WalletButton
              key={connector.id}
              onClick={() => {
                connect({
                  chainId: chainId,
                  connector: connector.connector,
                }, {
                  onSuccess: postConnect
                })
                onClose()
              }}
            >
              <Wallet src={connector.icon ? connector.icon : connector.icon} />
              <Typography variant="body1">{connector.name}</Typography>
            </WalletButton>
          ))}
        </Stack>
        <Stack direction={'column'} gap={theme.spacing(1)}>
          <Typography
            variant="body2"
            sx={{
              width: '100%',
              // height: '25px',
              color: '#8DB09F',
              textAlign: 'center'
            }}
          >
            By connecting a wallet, you agree to Singularity's {' '} <br />
            <Link href="https://www.thesingularity.network/terms-conditions" target="_blank" sx={{ color: '#77ED91', textDecoration: 'none' }}>
              Terms of Use
            </Link>
            {' '} and consent to {' '}
            <Link href="https://www.thesingularity.network/privacy-policy" target="_blank" sx={{ color: '#77ED91', textDecoration: 'none' }}>
              Privacy Policy
            </Link>.
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              background: '#D1DFD9',
              color: '#17181C',
              height: '65px',
              padding: '12px, 20px',
            }}>
            Close
          </Button>
        </Stack>
      </Stack>
    </BasicModal>
  )
}