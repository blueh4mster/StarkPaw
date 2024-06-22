import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract, RawArgsObject } from "starknet";
import { abi_manager } from "@/abi/abi_manager";
import { MANAGER } from "@/constants";
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

    const recipient = primaryWallet.address;

    const nftContract = new Contract(
      //manager contract
      abi_manager,
      MANAGER,
      provider as any
    );
    const prams: RawArgsObject = {
      num: num,
      address:
        "0x6688bc4aa4e318cfc6bc596a7b1ee219135e5a8f09f043bc387e4834df8c3fe",
      tokenId: 1,
    };
    const mintCallData = nftContract.populate("mint_nft", prams);
    const res = await nftContract.mint_nft(mintCallData.calldata);

    const hash = await provider.waitForTransaction(res.transaction_hash);
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
