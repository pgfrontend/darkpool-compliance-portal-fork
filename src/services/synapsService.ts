import { SynapsSessionStatus } from '../types'

export const formatSessionStatus = (status: SynapsSessionStatus) => {
  switch (status) {
    case SynapsSessionStatus.SUBMISSION_REQUIRED:
      return 'Submission Required'
    case SynapsSessionStatus.APPROVED:
      return 'Verified'
    case SynapsSessionStatus.REJECTED:
      return 'Rejected'
    case SynapsSessionStatus.PENDING_VERIFICATION:
      return 'Pending'
    case SynapsSessionStatus.RESET:
      return 'Reset'
    case SynapsSessionStatus.RESUBMISSION_REQUIRED:
      return 'Resubmission Required'
    default:
      return 'Unknown'
  }
}
