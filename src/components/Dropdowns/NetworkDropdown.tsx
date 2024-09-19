import { Box, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface NetworkDropdownProps {
  onSelect?: (chainId: number) => void
}

interface Network {
  name: string
  chainId: number
  image: string
}

const networks = [
  {
    name: 'Ethereum',
    chainId: 1,
    image: '/images/chain/ethereum.png',
  },
  {
    name: 'Arbitrum',
    chainId: 42161,
    image: '/images/chain/arbitrum.svg',
  },
  {
    name: 'Base',
    chainId: 8453,
    image: '/images/chain/base.svg',
  },
  {
    name: 'BounceBit',
    chainId: 1024,
    image: '/images/chain/bouncebit.svg',
  },
  {
    name: 'Polygon',
    chainId: 137,
    image: '/images/chain/polygon.svg',
  },
]

export const NetworkDropdown = ({ onSelect }: NetworkDropdownProps) => {
  const [network, setNetwork] = useState<Network>(networks[0])
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const ref = useRef(null)

  const onChangeNetwork = (network: Network) => {
    setNetwork(network)
    onSelect && onSelect(network.chainId)
    setOpen(false)
  }

  const onToogleModal = () => {
    setOpen(!open)
  }

  useOnClickOutside(ref, () => {
    setOpen(false)
  })
  return (
    <Box
      sx={{ position: 'relative' }}
      ref={ref}
    >
      {/* Button */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'200px'}
        sx={{
          background: theme.palette.other.neutral.n200,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '9999px',
          padding: '12px 20px',
          cursor: 'pointer',
        }}
        spacing={theme.spacing(2)}
        onClick={onToogleModal}
      >
        <Stack
          direction={'row'}
          spacing={theme.spacing(1)}
          alignItems={'center'}
        >
          <Image
            src={network.image}
            alt={network.name}
            width={24}
            height={24}
          />
          <Typography
            variant='button-sm'
            color={'white'}
          >
            {network.name}
          </Typography>
        </Stack>

        <Image
          src={'/images/arrow-down-icon.svg'}
          alt='arrow-down-icon'
          width={24}
          height={24}
        />
      </Stack>

      {/* Modal */}
      {open && (
        <Stack
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: theme.palette.other.neutral.n100,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {networks.map((network, index) => (
            <Stack
              key={index}
              direction={'row'}
              alignItems={'center'}
              spacing={theme.spacing(2)}
              onClick={() => onChangeNetwork(network)}
              sx={{
                cursor: 'pointer',
                padding: '12px 20px',
                '&:hover': {
                  background: theme.palette.other.neutral.n200,
                },
              }}
            >
              <Image
                src={network.image}
                alt={network.name}
                width={24}
                height={24}
              />
              <Typography
                variant='button-sm'
                color={'white'}
              >
                {network.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  )
}
