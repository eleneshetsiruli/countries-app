import { ChangeEvent, useReducer } from "react";
import countriesData from "../../../../data/countries.ts";
import styles from "./CountriesCard.module.css";
import { Action, CountryData } from "./card-components/interfaces/index.tsx";
import {
  SortingOptions,
  countriesReducer,
  NewCountry,
} from "../../../../data/index.ts";
import { Country } from "./card-components/country/index.tsx";

export const CountriesCard = () => {
  const [countriesStaticData, dispatch] = useReducer<
    React.Reducer<CountryData[], Action>
  >(countriesReducer, countriesData);

  const handleUpRating = (id: string) => () => {
    dispatch({ type: "INCREASE_RATING", payload: id });
  };

  function handleChangeOption(ev: ChangeEvent<HTMLSelectElement>) {
    const nonDeletedCards = countriesStaticData.filter(
      (country) => !country.deleted
    );
    const deletedCards = countriesStaticData.filter(
      (country) => country.deleted
    );

    const sortedNonDeletedCards: CountryData[] = nonDeletedCards.sort(
      (a, b) => {
        if (ev.target.value === "hight") {
          return b.rating - a.rating;
        } else if (ev.target.value === "low") {
          return a.rating - b.rating;
        }
        return 0;
      }
    );

    const finalSortedCards = [...sortedNonDeletedCards, ...deletedCards];

    dispatch({ type: "SET_DATA", payload: finalSortedCards });
  }

  const removeCountry = (id: string) => () => {
    dispatch({ type: "REMOVE_COUNTRY", payload: id });
  };

  const handleUndo = (id: string) => () => {
    dispatch({ type: "UNDO_DELETE", payload: id });
  };

  function handleSubmitNewCountry(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const countryName = formData.get("countryName");
    const countryPopulation = formData.get("countryPopulation");
    const countryCapital = formData.get("countryCapital");

    const newCountry: CountryData = {
      name: countryName as string,
      population: countryPopulation as string,
      capital: countryCapital as string,
      flag: "https://c7.alamy.com/comp/2B1FW7T/national-flags-fabric-tags-g20-countries-labels-official-country-flag-tag-vector-set-2B1FW7T.jpg",
      id: Math.random().toString(36),
      rating: 0,
      deleted: false,
      originalIndex: countriesStaticData.length - 1,
    };

    dispatch({ type: "ADD_COUNTRY", payload: newCountry });
  }

  return (
    <section className={styles.cardSection}>
      <SortingOptions onChange={handleChangeOption} />

      <div className={styles.container}>
        {countriesStaticData?.map((element, i) => (
          <Country
            handleUpRating={handleUpRating}
            data={element}
            removeCountry={removeCountry}
            key={i}
            deletedBtn={element.deleted}
            handleUndo={handleUndo}
          />
        ))}
      </div>
      <NewCountry handleSubmitNewCountry={handleSubmitNewCountry} />
    </section>
  );
};
