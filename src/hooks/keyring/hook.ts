import { keyringConfig } from "../../constants/keyringConfig";

export const useKeyring = (chainId: number) => {

    const launchKeyring = () => {
        window.open(keyringConfig[chainId], '_blank')
    }

    return { launchKeyring };
}