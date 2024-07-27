import React, { useState, useEffect } from 'react'
import {
  Box,
  IconButton,
  Toolbar,
  Stack,
  Typography,
  AppBar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Menu as MenuIcon, Close } from '@mui/icons-material'
import { WalletConnectButton } from '../Button'
import { ChainSwitchButton } from '../Button/ChainSwitchButton'
import Image from 'next/image'
import logo from '/public/logo.svg'


interface NavbarProps {
  title: string
  onToogle: () => void
}

const Navbar: React.FC<NavbarProps> = ({ title, onToogle }) => {
  const theme = useTheme()

  return (
    <AppBar
      position='static'
      sx={{
        zIndex: '1049',
        width: { sm: `100%` },
        // background: '#0D0D0D',
        boxShadow: 'none',
        background: 'transparent',
        height: '131px',
        padding: '32px 8px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0px',
        }}
      >
        <Box
          sx={{
            // width: 28,
            // height: 28,
            // background: '#77ED91',
            borderRadius: 9999,
          }}
        >
          <Image
            src={logo}
            // width={28}
            // height={28}
            alt={'Singularity Logo'}
            priority={true}
          />
        </Box>
        <Box
          display='flex'
          color={theme.palette.common.white}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={onToogle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h1'
            noWrap
            component='div'
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Stack direction={'row'}>
            <ChainSwitchButton />
            <WalletConnectButton />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
