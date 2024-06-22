import styles from "./PetNft.module.css";
import { Button } from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { BigNumberish, Call, Contract } from "starknet";
import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { abi_manager } from "@/abi/abi_manager";
import petChosen from "@/services/petCard";
import { MANAGER } from "../constants";
import { RawArgsObject } from "starknet";
import { uriSelector } from "@/uri";
import { byteArrayFromString } from "@/utils";

const PetNft = ({
  nftAddr,
  tracker,
  tokenid,
  url,
}: {
  nftAddr: string;
  tracker: string;
  tokenid: number;
  url: string;
}) => {
  const { primaryWallet } = useDynamicContext();

  if (!primaryWallet) return null;

  const handleSecond = async (sel: number) => {
    // update nft by calling backend function
    const provider = await primaryWallet.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();
    if (!provider) return;
    const managerContract = new Contract(
      //manager contract
      abi_manager,
      MANAGER,
      provider as any
    );

    const recipient = primaryWallet.address;
    const hexString = recipient;
    const address: BigNumberish = BigInt(hexString).toString() + "n";
    // console.log(address);
    const num = petChosen(tracker);
    const uri = uriSelector(num, sel);
    let arr = byteArrayFromString(uri);
    const prams: RawArgsObject = {
      address: recipient,
      num: num,
      tokenURI: arr,
      tokenId: tokenid,
    };
    try {
      if (!managerContract) return;
      const changeCallData = managerContract.populate("setTokenURI", prams);
      const res = await managerContract.setTokenURI(changeCallData.calldata);
      const hash = await provider.waitForTransaction(res.transaction_hash);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.card}>
      <div>address: {nftAddr}</div>
      <a href={url}>{url}</a>
      <div>tokenId: {tokenid.toString()}</div>
      <div className={styles.actions}>
        <Button
          onClick={() => {
            handleSecond(2);
          }}
          className={styles.actionButtons}
        >
          feed {tracker}
        </Button>
        <Button
          onClick={() => {
            handleSecond(1);
          }}
          className={styles.actionButtons}
        >
          pet {tracker}
        </Button>
        <Button
          onClick={() => {
            handleSecond(3);
          }}
          className={styles.actionButtons}
        >
          Put {tracker} to sleep
        </Button>
      </div>
    </div>
  );
};

export default PetNft;
