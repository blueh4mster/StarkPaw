import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import Sidebar from "@/components/Sidebar";
import Fetcher from "@/components/Fetcher";
import Header from "@/components/Header";

export default function petgallery() {
  const links = [
    { href: "/", label: "   Home" },
    { href: "/petgallery", label: "   Pet Gallery" },
    { href: "/contact", label: "    Contact" },
  ];

  const links2 = [{ href: "/", label: "StarkPaw" }];

  return (
    <>
      <Header links={links2} />
      <Sidebar links={links} />
      <div className="mainContent">
        <DynamicContextProvider
          settings={{
            environmentId: "4ab7a405-d8b1-4fe7-97bd-7c6ead2e8f66",
            walletConnectors: [
              EthereumWalletConnectors,
              StarknetWalletConnectors,
            ],
          }}
        >
          <Fetcher />
        </DynamicContextProvider>
      </div>
    </>
  );
}
