import { RpcProvider } from "starknet";

if (
  process.env.NODE_URL === undefined ||
  process.env.ACCOUNT_CLASS_HASH === undefined ||
  process.env.NETWORK_FEE_TOKEN === undefined
) {
  throw new Error(
    "Please set NODE_URL, ACCOUNT_CLASS_HASH, and NETWORK_FEE_TOKEN in .env file."
  );
}

export const provider = new RpcProvider({ nodeUrl: process.env.NODE_URL });
export const ACCOUNT_CLASS_HASH = process.env.ACCOUNT_CLASS_HASH;
export const NETWORK_FEE_TOKEN = process.env.NETWORK_FEE_TOKEN;
