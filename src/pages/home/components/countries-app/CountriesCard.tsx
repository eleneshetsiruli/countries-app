import {
  CardContent,
  CardDetails,
  CardImg,
  CardTitle,
  SingleCard,
} from "../../../../data/index.ts";
import countriesData from "../../../../data/countries.ts";
import styles from "./CountriesCard.module.css";
import { ChangeEvent, useState } from "react";
import { LikeButton } from "./card-components/LikeButton.tsx";
import { SortingOptions } from "./card-components/SortingOptions.tsx";

interface CountryData {
  name: string;
  population: string;
  flag: string;
  capital: string;
  id: string;
  rating: number;
}
interface CountryProps {
  data: CountryData;
  onClick: (id: string) => () => void;
}

export const CountriesCard = () => {
  const [countriesStaticData, setCountriesStaticData] =
    useState<CountryData[]>(countriesData);

  const handleUpRating = (id: string) => () => {
    {
      setCountriesStaticData((prevData) =>
        prevData.map((el) =>
          el.id === id ? { ...el, rating: el.rating + 1 } : el
        )
      );
    }
  };

  function handleChangeOption(ev: ChangeEvent<HTMLSelectElement>) {
    const sortedCards = [...countriesStaticData].sort((a, b) =>
      ev.target.value === "hight" ? b.rating - a.rating : a.rating - b.rating
    );
    setCountriesStaticData(sortedCards);
  }

  return (
    <>
      <SortingOptions onChange={handleChangeOption} />
      <div className={styles.container}>
        {countriesStaticData?.map((element, i) => (
          <Country onClick={handleUpRating} data={element} key={i} />
        ))}
      </div>
    </>
  );
};

const Country: React.FC<CountryProps> = ({ data, onClick }) => {
  const formattedPopulation = data.population.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  return (
    <SingleCard
      renderId={data.id}
      renderTitle={<CardTitle title={data.name} />}
      renderImg={<CardImg img={data.flag} />}
    >
      <CardContent>
        <CardDetails label="population:" content={formattedPopulation} />
        <div className={styles.ratingBox}>
          <CardDetails label="Rating" content={data.rating} />
        </div>
      </CardContent>
      <LikeButton onClick={onClick(data.id)} />
    </SingleCard>
  );
};
