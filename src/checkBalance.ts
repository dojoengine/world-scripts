import { Account, Call } from "starknet";
import { NETWORK_FEE_TOKEN, provider } from ".";

if (
  process.env.ACCOUNT_ADDRESS === undefined ||
  process.env.ACCOUNT_PRIVATE_KEY === undefined
) {
  throw new Error(
    "Please set ACCOUNT_PUBLIC_KEY, ACCOUNT_ADDRESS, and ACCOUNT_PRIVATE_KEY in .env file."
  );
}

const newAccount = new Account(
  provider,
  process.env.ACCOUNT_ADDRESS,
  process.env.ACCOUNT_PRIVATE_KEY,
  "1"
);

const balance: Call = {
  contractAddress: NETWORK_FEE_TOKEN,
  entrypoint: "balance_of",
  calldata: [process.env.ACCOUNT_ADDRESS],
};

console.log(await newAccount.callContract(balance));
