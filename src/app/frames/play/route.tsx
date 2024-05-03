import { TransactionTargetResponse } from "frames.js";
import { frames } from "../frames";
import { degen } from "viem/chains";
import { getContractAddress } from "@/common/supported-contracts";
import { encodeFunctionData, parseEther } from "viem";

const contract = getContractAddress(degen.id, "buttongame");

export const POST = frames(async (ctx) => {
  if (!ctx.message) {
    throw new Error("No message");
  }

  const user = ctx.message.connectedAddress;

  if (!user) {
    throw new Error("No user");
  }

  const totalCost = parseEther("69");

  const calldata = encodeFunctionData({
    abi: contract.abi,
    functionName: "play",
    args: [],
  });

  const txData: TransactionTargetResponse = {
    chainId: `eip155:${degen.id}`,
    method: `eth_sendTransaction`,
    params: {
      abi: contract.abi,
      to: contract.address,
      data: calldata,
      value: totalCost.toString(),
    },
  };

  return Response.json(txData);
});
