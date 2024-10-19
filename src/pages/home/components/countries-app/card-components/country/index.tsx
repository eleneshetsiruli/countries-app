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
import { useParams } from "react-router-dom";
import {
  cardTranslations,
  CountryNameKeys,
  CountryNameTranslations,
} from "./translations";

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

  const { lang } = useParams<{ lang?: string }>();
  const currentLang: keyof typeof cardTranslations =
    lang === "en" || lang === "ka" ? lang : "en";

  const content = cardTranslations[currentLang];

  const isCountryNameKey = (name: string): name is CountryNameKeys => {
    return name in CountryNameTranslations;
  };
  return (
    <>
      <SingleCard
        renderId={data.id}
        renderTitle={
          <CardTitle
            title={
              isCountryNameKey(data.name) &&
              CountryNameTranslations[data.name][currentLang]
                ? CountryNameTranslations[data.name][currentLang]
                : data.name
            }
          />
        }
        renderImg={<CardImg img={data.flag} />}
        deletedBtn={deletedBtn}
      >
        <CardContent>
          <CardDetails
            label={content.population}
            content={formattedPopulation}
          />
          <div className={styles.ratingBox}>
            <CardDetails label={content.Rating} content={data.rating} />
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
