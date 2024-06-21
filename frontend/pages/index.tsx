import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import Head from "next/head";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
// import { Account, Chain, Hex, Transport, WalletClient } from "viem";
// import { useState } from "react";
// import { useRouter } from 'next/navigation'
// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
// import { Call, Contract } from "starknet";
import PetCard from "../components/PetCard";
import Minter from "@/components/Minter";
import petChosen from "@/services/petCard";
import Sidebar from "@/components/Sidebar";
import { abi2 } from "../abi";

export default function Home() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/petgallery", label: "Pet Gallery" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <>
      <Head>
        <title>StarkPaw</title>
        <meta content="decentralized dynamic NFT pets" name="StarkPaw" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
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

          <h1 className="titl">Choose Your Pet!</h1>
          <Minter />
        </DynamicContextProvider>
      </div>
    </>
  );
}
