import { NetworkConfig, ChainId } from '../types'

export const networkConfig: { [chainId: number]: NetworkConfig } = {
  [ChainId.MAINNET]: {
    complianceManager: '0x2633F1725eF69082c6f56806249a5d9281b0b8D4',
    darkpoolAssetManager: '0x159F3668c72BBeCdF1fb31beeD606Ec9649654eB',
    explorerUrl: {
      tx: 'https://etherscan.io/tx/',
      address: 'https://etherscan.io/address/',
      block: 'https://etherscan.io/block/',
    },
  },
  [ChainId.ARBITRUM_ONE]: {
    complianceManager: '0x23A37b553c46f4864537Ab1e8d1e49804b47A5A7',
    darkpoolAssetManager: '0xf7C40b5057a1D1a3d58B02BCdb125E63ef380564',
    explorerUrl: {
      tx: 'https://arbiscan.io/tx/',
      address: 'https://arbiscan.io/address/',
      block: 'https://arbiscan.io/block/',
    },
  },
  [ChainId.BASE]: {
    complianceManager: '0x34091B8BD5B12fDA9541ABedD5C2A2715e9249d1',
    darkpoolAssetManager: '0x84eb120A35802460484015e6748375369e40468a',
    explorerUrl: {
      tx: 'https://basescan.org/tx/',
      address: 'https://basescan.org/address/',
      block: 'https://basescan.org/block/',
    },
  },
  [ChainId.BounceBit]: {
    complianceManager: '0x6c3Fac202241F3c6B19EBCa043091E3aab21F3F2',
    darkpoolAssetManager: '0x3bd7150667975E10010d8043Bfb98Ccc28808CFb',
    explorerUrl: {
      tx: 'https://bbscan.io/tx/',
      address: 'https://bbscan.io/address/',
      block: 'https://bbscan.io/block/',
    },
  },
  [ChainId.SEPOLIA]: {
    complianceManager: '0x762EBCcd1E2e70f4db27DC8438b4aC55B3A654B7',
    darkpoolAssetManager: '0xE79738042732E4A4b05CebCA8416e991326e4445',
    explorerUrl: {
      tx: 'https://sepolia.etherscan.io/tx/',
      address: 'https://sepolia.etherscan.io/address/',
      block: 'https://sepolia.etherscan.io/block/',
    },
  },
  [ChainId.BounceBitTestnet]: {
    complianceManager: '0x1Fa7Cb4925086128f3bb9e26761C9C75dbAC3CD1',
    darkpoolAssetManager: '0xf21f124F395271e8435A93063AE2AD74829D7b69',
    explorerUrl: {
      tx: 'https://testnet.bbscan.io/tx/',
      address: 'https://testnet.bbscan.io/address/',
      block: 'https://testnet.bbscan.io/block/',
    },
  },
  [ChainId.HARDHAT]: {
    complianceManager: '0x987Aa6E80e995d6A76C4d061eE324fc760Ea9F61',
    darkpoolAssetManager: '0xe24e7570Fe7207AdAaAa8c6c89a59850391B5276',
    explorerUrl: {
      tx: 'https://sepolia.etherscan.io/tx/',
      address: 'https://sepolia.etherscan.io/address/',
      block: 'https://sepolia.etherscan.io/block/',
    },
  },
  [ChainId.HARDHAT_BASE]: {
    complianceManager: '0x70bDA08DBe07363968e9EE53d899dFE48560605B',
    darkpoolAssetManager: '0x045857BDEAE7C1c7252d611eB24eB55564198b4C',
    explorerUrl: {
      tx: 'https://arbiscan.io/tx/',
      address: 'https://arbiscan.io/address/',
      block: 'https://arbiscan.io/block/',
    },
  },
}
