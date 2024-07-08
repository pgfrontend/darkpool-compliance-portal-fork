import { NetworkConfig, ChainId } from '../types'

export const networkConfig: { [chainId: number]: NetworkConfig } = {
  [ChainId.MAINNET]: {
    complianceManager: '0x630aD89523a18fA30F752297F3F53B7BC363488b',
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
    complianceManager: '0x3A906C603F080D96dc08f81CF2889dAB6FF299dE',
    darkpoolAssetManager: '0x716473Fb4E7cD49c7d1eC7ec6d7490A03d9dA332',
    explorerUrl: {
      tx: 'https://sepolia.etherscan.io/tx/',
      address: 'https://sepolia.etherscan.io/address/',
      block: 'https://sepolia.etherscan.io/block/',
    },
  },
  [ChainId.HARDHAT_ARBITRUM]: {
    complianceManager: '0xB6b14C427cA0AC44FE9a41332e8fE9BB4Ef244Ce',
    darkpoolAssetManager: '0x920D80F5490c073A46076a61897A6e6dc88Bbf0D',
    explorerUrl: {
      tx: 'https://arbiscan.io/tx/',
      address: 'https://arbiscan.io/address/',
      block: 'https://arbiscan.io/block/',
    },
  },
}
