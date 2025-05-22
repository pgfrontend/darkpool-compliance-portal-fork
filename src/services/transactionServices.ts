import { ChainId } from '../types'
import {
  confirmationsConfig,
  DEFAULT_CONFIRMATIONS,
} from '../constants/transactionConfig'

export const getConfirmations = (chainId: number) => {
  return confirmationsConfig[chainId] || DEFAULT_CONFIRMATIONS
}
