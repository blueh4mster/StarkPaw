import styles from "./PetCard.module.css";

const PetCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: any;
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default PetCard;
