import { degenPublicClient, ethPublicClient } from "@/common/evm-client";
import { getContractAddress } from "@/common/supported-contracts";
import { degen } from "viem/chains";
import { formatEther } from "viem";

const buttonGameContractInfo = getContractAddress(degen.id, "buttongame");
const contract = buttonGameContractInfo.address;
const abi = buttonGameContractInfo.abi;

export const getGameStats = async () => {

  const blockNumber = await degenPublicClient.readContract({
    address: contract,
    abi: abi,
    functionName: "getBlock",
    args: [],
  }) as bigint;

  let currentWinner = await degenPublicClient.readContract({
    address: contract,
    abi: abi,
    functionName: "currentWinner",
    args: [],
  }) as string;

  const potAmt = await degenPublicClient.readContract({
    address: contract,
    abi: abi,
    functionName: "pot",
    args: [],
  });
  const potDegen = formatEther(potAmt as bigint);
  const endBlock = await degenPublicClient.readContract({
    address: contract,
    abi: abi,
    functionName: "blockTarget",
    args: [],
  });
  const blocksToGo = ((endBlock as bigint) - blockNumber);

  let ensName;
  try {
    ensName = await ethPublicClient.getEnsName({
      address: currentWinner as `0x${string}`,
      strict: true,
    });
  } catch (e) {
    console.log("Error getting ENS name", e);
  }

  if (ensName) {
    currentWinner = ensName;
  } else {
    currentWinner = currentWinner.substring(0, 6);
  }

  if (blocksToGo < 0) {
    return {
      currentWinner: currentWinner.toString(),
      potDegen: potDegen.toString(),
      blocksToGo: "game over",
    };
  }

  return {
    currentWinner: currentWinner.toString(),
    potDegen: potDegen.toString(),
    blocksToGo: blocksToGo.toString(),
  };
};