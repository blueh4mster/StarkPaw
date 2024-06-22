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
import { DOG, CAT, BUNNY, MANAGER, nftSelector } from "../constants";

interface nftInfo {
  nftAddr: string;
  tokenid: number;
}

interface petsI {
  name: string;
  nftAddr: string;
  tokenid: number;
  uri: string;
}

const Fetcher = () => {
  const { primaryWallet } = useDynamicContext();
  const contractAddr = "";
  const [pets, setPets] = useState<petsI[]>([]);

  console.log(primaryWallet);

  useEffect(() => {
    const handleFetch = async () => {
      if (!primaryWallet) return null;
      const provider = await primaryWallet.connector.getSigner<
        WalletClient<Transport, Chain, Account>
      >();

      console.log(provider);
      if (!provider) return;

      const managerContract = new Contract(
        //manager contract
        abi_manager,
        contractAddr,
        provider as any
      );
      const nfts: nftInfo[] = await managerContract.get_nfts();
      const promises = nfts.map(async (nft, i) => {
        const type = nftSelector(nft.nftAddr);
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
          nft.nftAddr,
          provider as any
        );
        const uri = await nftContract.get_token_uri(nft.tokenid);
        const name = await nftContract.get_name();
        return {
          name,
          nftAddr: nft.nftAddr,
          tokenid: nft.tokenid,
          uri,
        };
      });
      const petData = await Promise.all(promises);
      setPets(petData);
    };
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
