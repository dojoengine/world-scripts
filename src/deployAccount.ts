import { Account, CallData } from "starknet";
import { ACCOUNT_CLASS_HASH, provider } from ".";

if (
  process.env.ACCOUNT_PUBLIC_KEY === undefined ||
  process.env.ACCOUNT_ADDRESS === undefined ||
  process.env.ACCOUNT_PRIVATE_KEY === undefined
) {
  throw new Error(
    "Please set ACCOUNT_PUBLIC_KEY, ACCOUNT_ADDRESS, and ACCOUNT_PRIVATE_KEY in .env file."
  );
}

const account = new Account(
  provider,
  process.env.ACCOUNT_ADDRESS,
  process.env.ACCOUNT_PRIVATE_KEY,
  "1"
);

const accountOptions = {
  classHash: ACCOUNT_CLASS_HASH,
  constructorCalldata: CallData.compile({
    publicKey: process.env.ACCOUNT_PUBLIC_KEY,
  }),
  addressSalt: process.env.ACCOUNT_PUBLIC_KEY,
};

await account.deployAccount(accountOptions, {
  nonce: 1,
  maxFee: 0, // TODO: update
});
