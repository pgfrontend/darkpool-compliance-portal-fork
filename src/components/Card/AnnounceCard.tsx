import { Button, Typography } from '@mui/material'
import { ContentBox } from './CompliancePortal'

interface AnnounceCardProps {
  onClick: () => void
}

export const AnnounceCard = ({ onClick }: AnnounceCardProps) => {
  return (
    <ContentBox
      maxWidth='480px'
      gap='32px'
    >
      <Typography
        fontSize='32px'
        lineHeight='41px'
        fontWeight='700'
        letterSpacing='-1.5%'
      >
        Verify your identity
      </Typography>

      <Typography
        fontSize='20px'
        lineHeight='30px'
        fontWeight='400'
        letterSpacing='-1.5%'
        color='#8DB09F'
      >
        This portal helps you verify your crypto wallet address for KYC/KYB
        compliance, Ensure your transactions are always secure and compliant!
      </Typography>

      <Button
        variant='contained'
        color='primary'
        onClick={onClick}
        sx={{
          width: '100%',
          height: '48px',
          padding: '10px 20px',
          lineHeight: '20px',
          fontSize: '18px',
          textTransform: 'uppercase',
          borderRadius: '50px',
        }}
      >
        Connect Wallet
      </Button>
    </ContentBox>
  )
}
