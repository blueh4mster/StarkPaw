import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Sidebar from "@/components/Sidebar";
import PetNft from "@/components/PetNft";

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
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <DynamicWidget />
        </DynamicContextProvider>
        <h1 className="titl">Your Pet Nfts!</h1>

        <div style={{ display: "flex", gap: "16px" }}></div>
        <div className="cardContainer">
          <PetNft
            nftAddr="0x456..."
            tracker="cat"
            url="https://docs.openzeppelin.com/contracts/4.x/api/token/erc721"
          />
          <PetNft
            nftAddr="0x123..."
            tracker="dog"
            url="https://docs.openzeppelin.com/contracts/4.x/api/token/erc721"
          />
        </div>
      </div>
    </>
  );
}
