import styles from "./PetNft.module.css";
import { Button } from "@chakra-ui/react";

const PetCard = ({
  nftAddr,
  tracker,
  url,
}: {
  nftAddr: string;
  tracker: string;
  url: string;
}) => {
  const handleFood = () => {};
  const handleSleep = () => {};
  const handlePet = () => {};
  return (
    <div className={styles.card}>
      <a href={url}>nftAddr</a>
      <Button onClick={handleFood}>feed {tracker}</Button>
      <Button onClick={handlePet}>pet {tracker}</Button>
      <Button onClick={handleSleep}>Put {tracker} to sleep</Button>
    </div>
  );
};

export default PetCard;
