import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { isAddressCompliance } from "../../services/keyringService";
import { useChainContext } from "../../contexts/ChainContext/hooks";


export const useComplianceCheck = (address: string) => {

    const [loading, setLoading] = useState(false);
    const [isCompliant, setIsCompliant] = useState(false);
    const { chainId } = useChainContext();

    useEffect(() => {
        if (address && ethers.utils.isAddress(address)) {
            setLoading(true);
            isAddressCompliance(address, chainId).then((isCompliant) => {
                setIsCompliant(isCompliant);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setIsCompliant(false);
        }
    }, [address]);

    return { loading, isCompliant };
}
