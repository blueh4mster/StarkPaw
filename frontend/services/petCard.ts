import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract } from "starknet";

const petChosen = async (petName: string) => {
  let message: string = "pet chosen! as " + petName;
  alert(message);
  // Mint nft 
  // navigate to repective pet page
  // show address of the asset 

};

export default petChosen;