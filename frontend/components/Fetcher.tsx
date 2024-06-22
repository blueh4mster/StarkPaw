import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract } from "starknet";
import { abi2 } from "../abi";
import { useEffect } from "react";
import PetNft from "./PetNft";

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
        abi2.abi,
        contractAddr,
        provider as any
      );
      const nfts: nftInfo[] = await managerContract.get_nfts();
      const promises = nfts.map(async (nft, i) => {
        const nftContract = new Contract(
          //nft contract
          abi2.abi,
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
