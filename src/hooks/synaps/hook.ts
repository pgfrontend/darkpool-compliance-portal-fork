import { Synaps } from "@synaps-io/verify-sdk";
import axios from "axios";
import { DarkpoolError } from "../../types";

const SYNAPS_SERVER_URL = process.env.NEXT_PUBLIC_SYNAPS_SERVER_URL

export const useSynaps = (chainId: number) => {

    const launchSynaps = async (wallet: string, onFinish: () => void, onClose: () => void) => {
        const sessionId = await getSessionId(wallet)

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

    const getSessionId = async (wallet: string) => {
        const result = await axios.post(`${SYNAPS_SERVER_URL}/synaps/api/session/create`, {
            chainId,
            wallet,
        })
        console.log("=======getToken", result)
        if (result.status === 200 && result.data.statusCode === 200) {
            return result.data.body.sessionId
        } else {
            throw new DarkpoolError('Failed to fetch session id');
        }
    }

    return { launchSynaps };
}
