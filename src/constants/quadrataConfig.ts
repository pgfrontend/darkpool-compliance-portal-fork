import { QuadClientEnvironment } from '@quadrata/core-react';
import { QuadClientKybConfig } from '@quadrata/kyb-react';
import { ChainId } from '../types';

export const quadKybConfig: Record<number, QuadClientKybConfig> = {
    [ChainId.ARBITRUM_ONE]: {
        apiUrl: 'https://prod.quadrata.com/api/v1',
        environment: QuadClientEnvironment.PRODUCTION,
        protocolName: 'Singularity',
        _debug: false,
    },
    [ChainId.POLYGON]: {
        apiUrl: 'https://prod.quadrata.com/api/v1',
        environment: QuadClientEnvironment.PRODUCTION,
        protocolName: 'Singularity',
        _debug: false,
    },
    [ChainId.BASE]: {
        apiUrl: 'https://prod.quadrata.com/api/v1',
        environment: QuadClientEnvironment.PRODUCTION,
        protocolName: 'Singularity',
        _debug: false,
    },
    [ChainId.SEPOLIA]: {
        apiUrl: 'https://int.quadrata.com/api/v1',
        environment: QuadClientEnvironment.SANDBOX,
        protocolName: 'Singularity',
        _debug: true,
    },
    [ChainId.HARDHAT_ARBITRUM]: {
        apiUrl: 'https://int.quadrata.com/api/v1',
        environment: QuadClientEnvironment.SANDBOX,
        protocolName: 'Singularity',
        _debug: true,
    },
    [ChainId.HARDHAT_POLYGON]: {
        apiUrl: 'https://int.quadrata.com/api/v1',
        environment: QuadClientEnvironment.SANDBOX,
        protocolName: 'Singularity',
        _debug: true,
    }
};