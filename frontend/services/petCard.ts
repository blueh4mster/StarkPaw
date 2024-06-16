import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { error } from "console";

export const petChosen = async (petName: string) => {
  let message: string = "pet chosen! as " + petName;
  console.log(message);
  alert(message);
  console.log("do we reach here?");
};
