import { Account, Chain, Hex, Transport, WalletClient } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Call, Contract } from "starknet";

const petChosen = (pet: string) => {
  switch (pet) {
    case "dog":
      return 1;
      break;
    case "cat":
      return 2;
      break;
    case "bunny":
      return 3;
      break;
    default:
      return 4;
  }
};

export default petChosen;
