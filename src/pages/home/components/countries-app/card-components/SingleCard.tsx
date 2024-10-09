import { Link } from "react-router-dom";
import styles from "../CountriesCard.module.css";

type SingleCardProps = {
  children: React.ReactNode;
  renderTitle: React.ReactNode;
  renderImg: React.ReactNode;
  renderId: React.ReactNode;
};

export const SingleCard = ({
  children,
  renderTitle,
  renderImg,
  renderId,
}: SingleCardProps) => {
  return (
    <div className={styles.singleCard}>
      <Link to={`cards/${renderId}`}>
        {renderTitle}
        {renderImg}
      </Link>
      {children}
    </div>
  );
};
