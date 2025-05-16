import { useState } from 'react'
import { useAccount } from 'wagmi'
import { SynapsSessionStatus } from '../../types'


export interface FetchSessionResponse {
  statusCode: number
  path: string
  timestamp: string
  success: boolean
  error: string | null
  body: {
    sessionId: string
    status: SynapsSessionStatus
  } | null
}

export const useSynaps = (chainId: number) => {
  const [session, setSession] = useState<{
    sessionId: string
    status: SynapsSessionStatus
  } | null>(null)
  const { address } = useAccount()

  const launchSynaps = async (
    wallet: string,
    onFinish: () => void,
    onClose: () => void,
    email?: string,
  ) => {
    
  }

  return { launchSynaps, session }
}
