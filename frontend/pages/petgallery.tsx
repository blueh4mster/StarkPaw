import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import Sidebar from "@/components/Sidebar";
import PetNft from "@/components/PetNft";
import { fetchPets } from "@/services/gallery";
import { useState } from "react";
import { useEffect } from "react";

interface petsI {
  nftAddr: string;
  tracker: string;
  uri: string;
}
export default function petgallery() {
  const [pets, setPets] = useState(Array<petsI>);
  const links = [
    { href: "/", label: "Home" },
    { href: "/petgallery", label: "Pet Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleFetch = async () => {
      const p = await fetchPets();
      setPets(p);
    };
    handleFetch();
  }, []);

  return (
    <>
      <Sidebar links={links} />
      <div className="mainContent">
        <DynamicContextProvider
          theme={"dark"}
          settings={{
            environmentId: "4ab7a405-d8b1-4fe7-97bd-7c6ead2e8f66",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <DynamicWidget />
        </DynamicContextProvider>
        <h1 className="titl">Your Pet Nfts!</h1>

        <div style={{ display: "flex", gap: "16px" }}></div>
        {pets !== null &&
          pets.map((pet, i) => (
            <PetNft nftAddr={pet.nftAddr} tracker={pet.tracker} url={pet.uri} />
          ))}
        {/* <PetNft
          nftAddr="0x456..."
          tracker="cat"
          url="https://docs.openzeppelin.com/contracts/4.x/api/token/erc721"
        />
        <PetNft
          nftAddr="0x123..."
          tracker="dog"
          url="https://docs.openzeppelin.com/contracts/4.x/api/token/erc721"
        /> */}
      </div>
    </>
  );
}
