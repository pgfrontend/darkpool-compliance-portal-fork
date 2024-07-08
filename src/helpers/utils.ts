import { ethers } from 'ethers'

export const ZERO_BYTES32 = hexlify32(0)

export function isAddressEquals(address1: string, address2: string) {
  return ethers.utils.getAddress(address1) === ethers.utils.getAddress(address2)
}


export function hexlify32(num: bigint | number) {
  return ethers.utils.hexZeroPad(ethers.utils.hexlify(num), 32)
}


export function hexEquals(hex1: string, hex2: string) {
  if(!hex1 || !hex2) {
    return false
  }

  return hex1.toLowerCase() === hex2.toLowerCase()
}

export function hexInArray(hex: string, array: string[]) {
  return array.some((item) => hexEquals(item, hex))
}
