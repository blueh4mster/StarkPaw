import React from "react";
import styles from "./Header.module.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="images/star.svg" alt="Site Logo" />
        <h3>StarkPaw</h3>
      </div>
      <DynamicContextProvider
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
    </header>
  );
};

export default Header;
