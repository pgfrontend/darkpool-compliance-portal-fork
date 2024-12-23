import { readContract } from '@wagmi/core';
import { wagmiConfig } from '../wagmi';
import complianceManagerAbi from '../abis/darkpool/IComplianceManager.json';
import { networkConfig } from '../constants/networkConfig';
import { ethers } from 'ethers';

export async function isAddressCompliance(address: string, chainId: number): Promise<boolean> {
    if (!address
        || !ethers.utils.isAddress(address)
        || !chainId
    ) {
        return false;
    }

    try{
        return await readContract(
            wagmiConfig,
            {
                address: networkConfig[chainId].accessPortal,
                abi: complianceManagerAbi.abi,
                functionName: 'isAuthorized',
                args: [
                    networkConfig[chainId].darkpoolAssetManager,
                    address
                ]
            }
        ) as boolean;
    } catch(e:any){
        console.error("failed calling isAddressCompliance",e);
        return false;
    }
}