import {
  CardDetails,
  CardContent,
  CardImg,
  CardTitle,
  SingleCard,
  LikeButton,
  DeleteBtn,
  UndoBtn,
} from "../../././../../../../data/index";
import { CountryProps } from "../interfaces";
import styles from "../../CountriesCard.module.css";

export const Country: React.FC<CountryProps> = ({
  data,
  handleUpRating,
  removeCountry,
  deletedBtn,
  handleUndo,
}) => {
  const formattedPopulation = data.population.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );
  return (
    <>
      <SingleCard
        renderId={data.id}
        renderTitle={<CardTitle title={data.name} />}
        renderImg={<CardImg img={data.flag} />}
        deletedBtn={deletedBtn}
      >
        <CardContent>
          <CardDetails label="population:" content={formattedPopulation} />
          <div className={styles.ratingBox}>
            <CardDetails label="Rating" content={data.rating} />
          </div>
        </CardContent>
        <div className={styles.likeDeleteBox}>
          <LikeButton handleUpRating={handleUpRating(data.id)} />
          {!data.deleted && (
            <DeleteBtn removeCountry={removeCountry(data.id)} />
          )}

          {data.deleted && <UndoBtn handleUndo={handleUndo(data.id)} />}
        </div>
      </SingleCard>
    </>
  );
};
