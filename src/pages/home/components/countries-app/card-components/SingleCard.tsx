import styles from "../CountriesCard.module.css";

type SingleCardProps = {
  children: React.ReactNode;
  renderTitle: React.ReactNode;
  renderImg: React.ReactNode;
};

export const SingleCard = ({
  children,
  renderTitle,
  renderImg,
}: SingleCardProps) => {
  return (
    <div className={styles.singleCard}>
      {renderTitle}
      {renderImg}
      {children}
    </div>
  );
};
