export const useCoinbaseEas = () => {

    const launchEas = () => {
        console.log("======launch eas")
        window.open('https://www.coinbase.com/onchain-verify', '_blank')
    }

    return { launchEas };
}