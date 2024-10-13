import { Link } from "react-router-dom";
import styles from "../CountriesCard.module.css";
type SingleCardProps = {
  children: React.ReactNode;
  renderTitle: React.ReactNode;
  renderImg: React.ReactNode;
  renderId: React.ReactNode;
  deletedBtn?: boolean;
};

export const SingleCard = ({
  children,
  renderTitle,
  renderImg,
  renderId,
  deletedBtn,
}: SingleCardProps) => {
  return (
    <div className={!deletedBtn ? `${styles.singleCard}` : `${styles.delete}`}>
      <Link to={`cards/${renderId}`}>
        {renderTitle}
        {renderImg}
      </Link>
      {children}
    </div>
  );
};
