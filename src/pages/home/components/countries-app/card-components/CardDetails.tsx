import styles from "../CountriesCard.module.css";

type CardDetailsProps = {
  label: string | undefined;
  population: string | undefined;
};

export const CardDetails = ({ label, population }: CardDetailsProps) => {
  return (
    <div className={styles.populationNumberBox}>
      <span>{label}</span>
      <span>{population}</span>
    </div>
  );
};
