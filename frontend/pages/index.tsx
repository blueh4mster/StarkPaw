import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import Head from "next/head";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import PetCard from "../components/PetCard";
import { petChosen } from "@/services/petCard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const handleClick = (pet: string) => {
    petChosen(pet);
  };
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
        </DynamicContextProvider>
        <h1 className="titl">Choose Your Pet!</h1>

        <div style={{ display: "flex", gap: "16px" }}></div>
        <div className="cardContainer">
          <PetCard
            imageSrc="images/dog.png"
            title="dog"
            description="cute pet likes hoomans"
            onClick={(e) => handleClick("dog")}
          />
          <PetCard
            imageSrc="images/cat.jpg"
            title="cat"
            description="cute pet hates hoomans"
            onClick={(e) => handleClick("cat")}
          />
          <PetCard
            imageSrc="images/bunny.jpg"
            title="bunny"
            description="cute pet likes carats(carrots)"
            onClick={(e) => handleClick("bunny")}
          />
        </div>
      </div>
    </>
  );
}
