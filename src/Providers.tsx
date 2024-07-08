import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { WagmiProvider } from 'wagmi'
import ToastProvider from './contexts/ToastContext/ToastProvider'
import toastStyle from './styles/Toast.module.scss'
import theme from './theme'
import { wagmiConfig } from './wagmi'
import ChainProvider from './contexts/ChainContext/ChainProvider'


interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(() => new QueryClient())


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <WagmiProvider config={wagmiConfig}>
      <ThemeProvider theme={theme}>
        <ChainProvider>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <ToastContainer className={toastStyle.toast} />
              {children}
            </ToastProvider>
          </QueryClientProvider>
        </ChainProvider>
      </ThemeProvider>
    </WagmiProvider>
  )
}

export default Providers