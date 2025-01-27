import { Synaps } from '@synaps-io/verify-sdk'
import axios from 'axios'
import { DarkpoolError, SynapsSessionStatus } from '../../types'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { em } from 'polished'

const SYNAPS_SERVER_URL = process.env.NEXT_PUBLIC_SYNAPS_SERVER_URL

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
    const sessionId = await getSessionId(wallet, email ? email : "")
    Synaps.init({
      sessionId: sessionId,
      service: 'corporate',
      onFinish: () => {
        onFinish()
      },
      onClose: () => {
        onClose()
      },
    })

    Synaps.show()
  }

  const getSessionId = async (wallet: string, email:string) => {
    const result = await axios.post(
      `${SYNAPS_SERVER_URL}/synaps/api/session/create`,
      {
        chainId,
        wallet,
        email
      }
    )
    console.log('=======getToken', result)
    if (result.status === 200 && result.data.statusCode === 200) {
      return result.data.body.sessionId
    } else {
      throw new DarkpoolError('Failed to fetch session id')
    }
  }

  const fetchSession = async (wallet: string) => {
    const { data } = await axios({
      method: 'GET',
      url: `${SYNAPS_SERVER_URL}/synaps/api/session/status?wallet=${wallet}`,
    })
    return data as FetchSessionResponse
  }

  useEffect(() => {
    if (address) {
      fetchSession(address).then((res) => {
        if (res?.body) {
          setSession(res.body)
        }
      })
    }
  }, [address])

  return { launchSynaps, fetchSession, session }
}
