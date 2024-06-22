import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import Sidebar from "@/components/Sidebar";
import PetNft from "@/components/PetNft";
import { fetchPets } from "@/services/gallery";
import { useState } from "react";
import { useEffect } from "react";
import Fetcher from "@/components/Fetcher";

interface petsI {
  nftAddr: string;
  tokenid: Number;
  uri: string;
}
export default function petgallery() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/petgallery", label: "Pet Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <Sidebar links={links} />
      <div className="mainContent">
        <DynamicContextProvider
          theme={"dark"}
          settings={{
            environmentId: "4ab7a405-d8b1-4fe7-97bd-7c6ead2e8f66",
            walletConnectors: [
              EthereumWalletConnectors,
              StarknetWalletConnectors,
            ],
          }}
        >
          <DynamicWidget />
          <Fetcher />
        </DynamicContextProvider>
      </div>
    </>
  );
}
