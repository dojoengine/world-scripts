import { CallData, stark, hash, ec } from "starknet";
import fs from "fs";
import { ACCOUNT_CLASS_HASH } from ".";

const privateKey = stark.randomAddress();
const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);

const OZaccountConstructorCallData = CallData.compile({
  publicKey: starkKeyPub,
});

const OZcontractAddress = hash.calculateContractAddressFromHash(
  starkKeyPub,
  ACCOUNT_CLASS_HASH,
  OZaccountConstructorCallData,
  0
);

const envData = `ACCOUNT_PRIVATE_KEY=${privateKey}
ACCOUNT_PUBLIC_KEY=${starkKeyPub}
ACCOUNT_ADDRESS=${OZcontractAddress}
`;

const envFilePath = "./.env";

fs.appendFile(envFilePath, envData, (err) => {
  if (err) {
    console.error("Error writing to .env file:", err);
  } else {
    console.log(`Account details exported to ${envFilePath}`);
  }
});
