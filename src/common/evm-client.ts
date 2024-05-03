import {createPublicClient, http} from "viem";
import {addresses} from "@/common/supported-contracts";
import {AppConfig} from "@/common/app-config";
import { degen, mainnet } from "viem/chains";

const DEGEN_RPC_URL = AppConfig.DEGEN_RPC_URL;
const ETH_RPC_URL = AppConfig.ETH_RPC_URL;

export const degenPublicClient = createPublicClient({
    chain: {
        ...degen,
        contracts: {
            ...degen.contracts,
            ...addresses[degen.id],
        },
    },
    transport: http(DEGEN_RPC_URL)
});

export const ethPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(ETH_RPC_URL)
});