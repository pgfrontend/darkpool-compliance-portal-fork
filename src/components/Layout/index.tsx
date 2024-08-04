import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navigation/Navbar'
import { useAccount } from 'wagmi'
import { chainsConfig } from '../../constants'
import { SwitchChainModal } from '../Modal/SwitchChainModal'
import { useChainContext } from '../../contexts/ChainContext/hooks'

interface Props {
  children?: React.ReactNode
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const [mounted, setMounted] = useState(false)
  const [toogle, setToogle] = useState<number>(Date.now())

  const { isConnected, chainId } = useAccount()
  const { chainId: currentChain } = useChainContext()
  const needSwitchChain =
    isConnected && chainId && (currentChain != chainId || !chainsConfig.supportedChains.includes(chainId))
  const [switchModalOpen, setSwitchModalOpen] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (needSwitchChain) {
      setSwitchModalOpen(true)
    } else {
      setSwitchModalOpen(false)
    }
  }, [needSwitchChain])

  if (!mounted) return null

  const onToogle = () => {
    setToogle(Date.now())
  }

  return (
    <Box>
      <Navbar
        title={title}
        onToogle={onToogle}
      />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          height: '100vh',
          overflow: 'auto',
          position: 'relative',
          width: { sm: `100%` },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            width: '400px',
            height: '400px',
            left: 'calc(50% - 250px / 2 - 0.5px)',
            top: 'calc(50% - 380px / 2 + 1px)',
            background: '#77ED91',
            opacity: '0.5',
            filter: 'blur(202.95px)',
            zIndex: 1,
          }}
        ></Box>
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Box>
      <SwitchChainModal
        open={switchModalOpen}
        onClose={() => { }}
      >
        <></>
      </SwitchChainModal>
    </Box>
  )
}

export default Layout
