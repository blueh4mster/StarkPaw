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
  tokenid: Number;
}

interface petsI {
  name: string;
  nftAddr: string;
  tokenid: Number;
  uri: string;
}

const Fetcher = () => {
  const { primaryWallet } = useDynamicContext();
  const contractAddr = "";
  const [pets, setpets] = useState(Array<petsI>);

  if (!primaryWallet) return null;

  useEffect(() => {
    const handleFetch = async () => {
      const provider = await primaryWallet.connector.getSigner<
        WalletClient<Transport, Chain, Account>
      >();
      if (!provider) return;

      const managerContract = new Contract(
        //manager contract
        abi2.abi,
        contractAddr,
        provider as any
      );
      const nfts: Array<nftInfo> = await managerContract.get_nfts();
      nfts.map(async (nft, i) => {
        const nftContract = new Contract(
          //nft contract
          abi2.abi,
          nft.nftAddr,
          provider as any
        );
        const uri = await nftContract.get_token_uri(nft.tokenid);
        const name = await nftContract.get_name();
        let pets_tmp = pets;
        pets_tmp.push({
          name: name,
          nftAddr: nft.nftAddr,
          tokenid: nft.tokenid,
          uri: uri,
        });
        setpets(pets_tmp);
      });
    };
    handleFetch();
  }, []);
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
