import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract } from "starknet";
import { abi_manager } from "@/abi/abi_manager";
import { abi1 } from "@/abi/abi1";
import { abi2 } from "@/abi/abi2";
import { abi3 } from "@/abi/abi3";
import { useEffect } from "react";
import PetNft from "./PetNft";
import { MANAGER, nftSelector } from "../constants";
import { stringFromByteArray } from "@/utils";
// const BigNumber = require("bignumber.js");

interface petsI {
  name: string;
  nftAddr: string;
  tokenid: number;
  uri: string;
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Fetcher = () => {
  const { primaryWallet } = useDynamicContext();
  const [pets, setPets] = useState<petsI[]>([]);

  const handleFetch = async () => {
    // console.log(primaryWallet);
    if (primaryWallet === null) return null;
    // // await wait(2000); // Wait for 2 seconds
    // console.log(primaryWallet);
    const provider = await primaryWallet?.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();
    // console.log(provider);
    if (!provider) return;

    const managerContract = new Contract(
      //manager contract
      abi_manager,
      MANAGER,
      provider as any
    );

    const recipient = primaryWallet?.address;

    try {
      const nfts = await managerContract.get_nfts(recipient);

      // console.log(nfts);

      const promises = nfts.map(async (nft) => {
        let bigNumberStr = nft[1].toString();
        let number = Number(bigNumberStr);
        if (number !== 0) {
          let addr = nft[0];
          let hexValue = addr.toString(16);

          const targetLength = 64; // 252 bits = 63 hex characters
          const zeroesNeeded = targetLength - hexValue.length;
          const phex = "0x" + "0".repeat(zeroesNeeded) + hexValue;

          const type = nftSelector(phex);
          let abi = abi1;
          switch (type) {
            case 1:
              abi = abi1;
              break;
            case 2:
              abi = abi2;
              break;
            case 3:
              abi = abi3;
              break;
          }

          const nftContract = new Contract(
            //nft contract
            abi,
            phex,
            provider as any
          );
          // const uri = await nftContract.call("get_token_uri", 6n);
          const ur = await nftContract.get_token_uri(number);
          const byteArray0 = {
            data: ur.data,
            pending_word: ur.pending_word,
            pending_word_len: ur.pending_word_len,
          };
          const uri = stringFromByteArray(byteArray0);
          const final_uri = uri.slice(0, uri.length - 1);
          // console.log(uri);
          // const name = await nftContract.get_name();
          let nam = await nftContract.call("get_name");
          const byteArray = {
            data: nam.data,
            pending_word: nam.pending_word,
            pending_word_len: nam.pending_word_len,
          };
          let name = stringFromByteArray(byteArray);
          // console.log(name);
          // console.log(nam);
          // console.log(nam.data);
          // console.log(nam.pending_word);

          const petData: petsI = {
            name: name,
            nftAddr: phex,
            tokenid: number,
            uri: final_uri,
          };
          let p = pets;
          // console.log(p);
          let isInArray = pets.includes(petData);
          // console.log(isInArray);
          if (!isInArray) {
            p.push(petData);
          }
          setPets(p);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleFetch();
  }, [primaryWallet]);
  return (
    <>
      <h1 className="titl">Your Pet Nfts!</h1>
      {pets !== null &&
        pets.map((pet, i) => (
          <PetNft
            nftAddr={pet.nftAddr}
            tracker={pet.name}
            tokenid={pet.tokenid}
            url={pet.uri}
          />
        ))}
    </>
  );
};

export default Fetcher;
