import styles from "./PetCard.module.css";

const PetCard = ({
  imageSrc,
  title,
  description,
  onClick
}: {
  imageSrc: any;
  title: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageSrc} alt={title} className={styles.image} id="img1"/>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default PetCard;
