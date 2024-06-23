import React from "react";
import styles from "./Header.module.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";

interface HeaderProps {
  links: { href: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="images/star.svg" alt="Site Logo" />
        {links.map((link, index) => (
          <a href={link.href} className={styles.tit}>
            {link.label}
          </a>
        ))}
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
