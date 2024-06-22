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
const BigNumber = require("bignumber.js");

interface petsI {
  name: string;
  nftAddr: string;
  tokenid: number;
  uri: string;
}

const Fetcher = () => {
  const { primaryWallet } = useDynamicContext();
  const [pets, setPets] = useState<petsI[]>([]);
  const handleFetch = async () => {
    if (!primaryWallet) return null;
    const provider = await primaryWallet.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();

    console.log(provider);
    if (!provider) return;
    const recipient = primaryWallet.address;
    const managerContract = new Contract(
      //manager contract
      abi_manager,
      MANAGER,
      provider as any
    );
    try {
      const nfts = await managerContract.get_nfts(recipient);

      console.log(nfts);
      const promises = nfts.map(async (nft, i) => {
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
          const uri = await nftContract.get_token_uri(number);
          const name = await nftContract.get_name();
          const petData: petsI = {
            name: "random",
            nftAddr: phex,
            tokenid: number,
            uri: "random2",
          };
          let p = pets;
          p.push(petData);
          console.log(p);
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
