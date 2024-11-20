import { Box, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { chainsConfig } from '../../constants'
import { supportedChains } from '../../constants/chains'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

interface NetworkDropdownProps {
  onSelect?: (chainId: number) => void
}

export const NetworkDropdown = ({ onSelect }: NetworkDropdownProps) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const ref = useRef(null)
  const { chainId } = useChainContext()



  const otherChains = chainsConfig.supportedChains.filter(tmpChainId => tmpChainId != chainId)

  const [network, setNetwork] = useState<number>(otherChains[0])

  const currentChainConfig = supportedChains[network]

  const isCurrentChainSupported = chainsConfig.supportedChains.includes(chainId)

  useEffect(() => {
    onSelect && onSelect(network)
  }, [network])


  const onChangeNetwork = (chainId: number) => {
    setNetwork(chainId)
    onSelect && onSelect(chainId)
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
        width={'240px'}
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
          {isCurrentChainSupported ? (
            <Image
              width={24}
              height={24}
              src={currentChainConfig.icon}
              alt=''
            />
          ) : (
            <WarningAmberIcon sx={{ width: 24, height: 24 }} />
          )}
          {/* <Image
            src={supportedChains[network].icon}
            alt={''}
            width={24}
            height={24}
          /> */}
          <Typography
            variant='button-sm'
            color={'white'}
          >
            {currentChainConfig.name}
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
          {otherChains.map((chainId, index) => (
            <Stack
              key={index}
              direction={'row'}
              alignItems={'center'}
              spacing={theme.spacing(2)}
              onClick={() => onChangeNetwork(chainId)}
              sx={{
                cursor: 'pointer',
                padding: '12px 20px',
                '&:hover': {
                  background: theme.palette.other.neutral.n200,
                },
              }}
            >
              <Image
                src={supportedChains[chainId].icon}
                alt={''}
                width={24}
                height={24}
              />
              <Typography
                variant='button-sm'
                color={'white'}
              >
                {supportedChains[chainId].name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  )
}
