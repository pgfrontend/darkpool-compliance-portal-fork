import { Box, Drawer, List, Stack } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '/public/logo.svg'



export const LeftMenuDrawer: React.FC<{
  drawerWidth: number
  toogle: number
}> = ({ drawerWidth, toogle }) => {

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)


  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  useEffect(() => {
    handleDrawerToggle()
  }, [toogle])

  const drawer = (
    <Box component="nav">
      <Stack
        direction={'row'}
        sx={{
          padding: '4px 8px',
          height: '36.7px',
          alignItems: 'center',
          gap: '6px',
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
      </Stack>
      <nav>
        <List
          disablePadding
          sx={{
            width: '249px',
            gap: '28px',
            mt: '32px',
          }}
        >
        </List>
      </nav>
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          padding: '32px',
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            zIndex: '1049',
            boxSizing: 'border-box',
            width: drawerWidth,
            background: '#17181C',
            color: '#fff',
            padding: '32px',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            zIndex: '1049',
            boxSizing: 'border-box',
            width: drawerWidth,
            background: '#17181C',
            color: '#fff',
            padding: '32px',
          },
        }}
        open
      >
        <Stack direction="column" height={'100%'}>
          <Box height={'100%'}>{drawer}</Box>
        </Stack>
      </Drawer>
    </Box>
  )
}