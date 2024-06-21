import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract } from "starknet";
import { abi2 } from "../abi";
import PetCard from "./PetCard";

const Minter = () => {
  const { primaryWallet } = useDynamicContext();
  const contractAddr = "";
  const [txnHash, setTxnHash] = useState("");
  const [minted, setMinted] = useState(false);
  const router = useRouter();

  if (!primaryWallet) return null;

  const handleClick = async (pet: string) => {
    let num = 0;
    switch (pet) {
      case "dog":
        num = 1;
        break;
      case "cat":
        num = 2;
        break;
      case "bunny":
        num = 3;
        break;
    }
    const provider = await primaryWallet.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();
    if (!provider) return;

    const nftContract = new Contract(
      //manager contract
      abi2.abi,
      contractAddr,
      provider as any
    );
    const mintCallData: Call = nftContract.populate("mint_nft", {
      num: num,
      recipient: provider.account.address,
      tokenId: 1,
    });
    const { transaction_hash: txhash } = await nftContract._mint(
      mintCallData.calldata
    );

    const hash = await provider.waitForTransaction(txhash);
    setTxnHash(hash.transaction_hash);
    setMinted(true);
  };

  return (
    <>
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
      {minted === true && (
        <button type="button" onClick={() => router.push("/petgallery")}>
          view minted pet nft
        </button>
      )}
    </>
  );
};

export default Minter;
