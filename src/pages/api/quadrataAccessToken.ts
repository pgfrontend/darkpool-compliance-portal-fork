import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.QUADRATA_APIKEY || (() => { throw new Error('QUADRATA_APIKEY is not defined'); })()
const API_URL = process.env.QUADRATA_APIURL || (() => { throw new Error('QUADRATA_APIURL is not defined'); })()


export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const res = await axios.post(API_URL, {
            apiKey: API_KEY
        })
        if (res.status === 200 && res.data && res.data.data) {
            const accessToken = res.data.data.accessToken
            return response.status(200).json({ accessToken })
        } else {
            return response
                .status(400)
                .json({ error: 'Error calling quadrata api' })
        }
    } catch (error: any) {
        return response.status(500).json({ error: 'Error getting quadrata access token' })
    }
}
