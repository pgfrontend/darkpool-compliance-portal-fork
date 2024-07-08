import { QuadrataOnApplicationEndCallback } from '@quadrata/core-react';
import { PageKyb, QuadrataKyb } from "@quadrata/kyb-react";
import { useState } from "react";
import { quadKybConfig } from "../../constants/quadrataConfig";
import axios from 'axios';
import { DarkpoolError } from '../../types';


export function useQuadrata(address: string | undefined, chainId: number, onClose: () => void) {
    const [loading, setLoading] = useState(false)

    const handleOnApplicationEnd: QuadrataOnApplicationEndCallback = ({ status, error }) => {
        // Application has reached an end state: completion or error
        console.log('handleOnApplicationEnd:::status:::', status);
        console.log('handleOnApplicationEnd:::error:::', error);
    };

    const handleOnHide = () => {
        // do something on QuadrataKyb client hide
        console.log("hidehide")
        onClose()
    };

    const handlePageChange = (page: PageKyb) => {
        // do something on page change
        console.log(page)
    };

    const getAccessToken = async () => {
        const result = await axios.get('/api/quadrataAccessToken')
        if (result.status === 200) {
            return result.data.accessToken
        } else {
            throw new DarkpoolError('Failed to fetch access token');
        }
    };

    const createQuadrataWidget = (accessToken: string, chainId: number) => {
        return (
            <QuadrataKyb
                accessToken={accessToken}
                config={quadKybConfig[chainId]}
                onApplicationEnd={handleOnApplicationEnd}
                onHide={handleOnHide}
                onPageChange={handlePageChange}
            />
        );
    }

    return { loading, getAccessToken, createQuadrataWidget }

}

