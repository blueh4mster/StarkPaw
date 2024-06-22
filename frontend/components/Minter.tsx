import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract, RawArgsObject } from "starknet";
import { abi_manager } from "@/abi/abi_manager";
import { MANAGER } from "@/constants";
import PetCard from "./PetCard";
import petChosen from "@/services/petCard";

const Minter = () => {
  const { primaryWallet } = useDynamicContext();
  const contractAddr = "";
  const [txnHash, setTxnHash] = useState("");
  const [minted, setMinted] = useState(false);
  const router = useRouter();

  if (!primaryWallet) return null;

  const handleClick = async (pet: string) => {
    const num = petChosen(pet);
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
      address: recipient,
      tokenId: 6,
    };
    try {
      const mintCallData = nftContract.populate("mint_nft", prams);
      const res = await nftContract.mint_nft(mintCallData.calldata);
      const hash = await provider.waitForTransaction(res.transaction_hash);
      setTxnHash(hash.transaction_hash);
      setMinted(true);
    } catch (e) {
      console.log(e);
    }
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
