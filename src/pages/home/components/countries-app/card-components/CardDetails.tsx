import styles from "../CountriesCard.module.css";

type CardDetailsProps = {
  label: string | undefined;
  content: string | undefined | number;
};

export const CardDetails = ({ label, content }: CardDetailsProps) => {
  return (
    <div className={styles.populationNumberBox}>
      <span>{label}</span>
      <span>{content}</span>
    </div>
  );
};
