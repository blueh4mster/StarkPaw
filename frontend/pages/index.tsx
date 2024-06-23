import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import Head from "next/head";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import PetCard from "../components/PetCard";
import Minter from "@/components/Minter";
import petChosen from "@/services/petCard";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  const links = [
    { href: "/", label: "   Home" },
    { href: "/petgallery", label: "   Pet Gallery" },
    { href: "/contact", label: "   Contact" },
  ];
  return (
    <>
      <Head>
        <title>StarkPaw</title>
        <meta content="decentralized dynamic NFT pets" name="StarkPaw" />
        <link href="/logo.jpg" rel="icon" />
      </Head>
      <Header />
      <DynamicContextProvider
        settings={{
          environmentId: "4ab7a405-d8b1-4fe7-97bd-7c6ead2e8f66",
          walletConnectors: [
            EthereumWalletConnectors,
            StarknetWalletConnectors,
          ],
        }}
      >
        <Sidebar links={links} />

        <div className="mainContent">
          <h1 className="titl">Choose Your Pet!</h1>
          <Minter />
        </div>
      </DynamicContextProvider>
    </>
  );
}
