import { Address } from "viem";
import { degen } from "viem/chains";
import buttonGameABI from "../abi/button-game.json";

export const supportedChains = [degen.id] as const;
export const supportedContracts = [
  "buttongame",
] as const;

export type SupportedChain = (typeof supportedChains)[number]
export type SupportedContract = (typeof supportedContracts)[number]

type ContractInfo = {
  address: Address;
  abi: any;
}

export const addresses: Record<SupportedChain, Partial<Record<SupportedContract, ContractInfo>>> = {
  666666666: {
    buttongame: {
      address: "0xEEbD89daFA4Cb57ED0342A5405b84D2f7a059e96",
      abi: buttonGameABI,
    },
  },
} as const;

export const getContractAddress = (chainId: SupportedChain, contract: SupportedContract): ContractInfo => {
  const contractInfo = addresses[chainId]?.[contract];
  if (!contractInfo) {
    throw new Error(`Contract address not found for chain ${chainId} and contract ${contract}`);
  }
  return contractInfo;
};