import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useChainContext } from "../../contexts/ChainContext/hooks";
import { isAddressCompliance } from "../../services/complianceService";


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
