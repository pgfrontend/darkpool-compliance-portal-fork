import { Button, Stack, Typography } from '@mui/material'
import { ContentBox } from './CompliancePortal'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useConnect, useConnectors } from 'wagmi'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
import CoinbaseWallet from '../../../public/images/wallets/coinbase.svg'
import MetaMask from '../../../public/images/wallets/metamask.svg'
import WalletConnect from '../../../public/images/wallets/walletconnect.svg'
import { useChainContext } from '../../contexts/ChainContext/hooks'

const WALLET_CONNECT = {
  id: 'walletconnect',
  name: 'WalletConnect',
  icon: WalletConnect,
  connector: walletConnect({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ?? '',
    showQrModal: true,
  }),
}

const COINBASE = {
  id: 'coinbase',
  name: 'Coinbase Wallet',
  icon: CoinbaseWallet,
  connector: coinbaseWallet({ appName: 'Singularity' }),
}

const PARTIAL_METAMASK = {
  id: 'metamask',
  name: 'MetaMask       ',
  icon: MetaMask,
}

export const ConnectWalletCard = () => {
  const { chainId } = useChainContext()
  const { connect } = useConnect()

  const wagmiConnectors = useConnectors()

  const [connectButtons, setConnectButtons] = useState<any[]>([WALLET_CONNECT, COINBASE])

  useEffect(() => {
    const metaMaskConnector = wagmiConnectors.find((connector) => connector.id === 'io.metamask')
    if (metaMaskConnector) {
      const newMetaMask = {
        ...PARTIAL_METAMASK,
        connector: metaMaskConnector,
      }
      setConnectButtons([newMetaMask, WALLET_CONNECT, COINBASE])
    }
  }, [wagmiConnectors])

  return (
    <ContentBox
      maxWidth='480px'
      gap='32px'
      paddingBottom='64px'
    >
      <Stack
        direction='row'
        gap='8px'
      >
        <Typography
          fontSize='24px'
          lineHeight='27px'
          fontWeight='700'
          letterSpacing='-1.5%'
        >
          Select a wallet to connect
        </Typography>
      </Stack>

      <Stack
        gap='8px'
        width='100%'
      >
        {connectButtons.map((button, index) => (
          <Button
            key={button.id}
            variant='contained'
            onClick={() => {
              connect({
                chainId,
                connector: button.connector,
              })
            }}
            sx={{
              width: '100%',
              padding: '16px',
              lineHeight: '20px',
              fontSize: '18px',
              borderRadius: '50px',
              bgcolor: '#17181C',
              border: '1px solid #1D5A2B',
              color: '#FFF',
              transition: '0.3s ease',
              ':hover': {
                border: '1px solid #92F1A7',
                bgcolor: '#92F1A7',
                color: '#000',
              },
            }}
          >
            <Stack
              direction='row'
              gap='8px'
              alignItems='center'
            >
              <Image
                src={button.icon.src}
                width={32}
                height={32}
                alt={button.name}
              />
              {button.name}
            </Stack>
          </Button>
        ))}
      </Stack>
    </ContentBox>
  )
}
