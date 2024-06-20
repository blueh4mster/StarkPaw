import styles from "./PetNft.module.css";
import { Button } from "@chakra-ui/react";

const PetNft = ({
  nftAddr,
  tracker,
  url,
}: {
  nftAddr: string;
  tracker: string;
  url: string;
}) => {
  const handleFood = () => {
    // update nft by calling backend function
  };
  const handleSleep = () => {
    // update nft by calling backend function
  };
  const handlePet = () => {
    // don't do anything 
  };
  return (
    <div className={styles.card}>
      <a href={url}>{nftAddr}</a>
      <div className={styles.actions}>
        <Button onClick={handleFood} className={styles.actionButtons}>
          feed {tracker}
        </Button>
        <Button onClick={handlePet} className={styles.actionButtons}>
          pet {tracker}
        </Button>
        <Button onClick={handleSleep} className={styles.actionButtons}>
          Put {tracker} to sleep
        </Button>
      </div>
    </div>
  );
};

export default PetNft;
