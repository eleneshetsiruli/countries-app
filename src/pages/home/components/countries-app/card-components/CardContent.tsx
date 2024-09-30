import styles from "../CountriesCard.module.css";

type CardContentdProps = {
  children: React.ReactNode;
};

export const CardContent = ({ children }: CardContentdProps) => {
  return <div className={styles.cardContentBox}>{children}</div>;
};
