import { ChangeEvent, useReducer, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    population: "",
    capital: "",
  });

  const [newCountry, setNewCountry] = useState({
    name: "",
    population: "",
    capital: "",
    flag: "https://c7.alamy.com/comp/2B1FW7T/national-flags-fabric-tags-g20-countries-labels-official-country-flag-tag-vector-set-2B1FW7T.jpg",
    id: Math.random().toString(36),
    rating: 0,
    deleted: false,
    originalIndex: countriesStaticData.length - 1,
  });

  function handleChangeInput(ev: ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;
    setNewCountry((prev) => ({ ...prev, [name]: value }));

    if (name === "name" && value.length < 5) {
      setErrorMessage((prev) => ({ ...prev, name: "მინიმუმ 5 სიმბოლო" }));
    } else if (name === "population" && isNaN(Number(value))) {
      setErrorMessage((prev) => ({
        ...prev,
        population: "შეიყვანეთ მხოლოდ ციფრები",
      }));
    } else if (name === "capital" && !value) {
      setErrorMessage((prev) => ({ ...prev, capital: "აუცილებელი ველი" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  }

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

    if (!validateFields()) {
      return;
    }
    const freshCountry = {
      ...newCountry,
      id: Math.random().toString(36),
      deleted: false,
      originalIndex: countriesStaticData.length,
    };

    {
      dispatch({ type: "ADD_COUNTRY", payload: freshCountry });
      setNewCountry({
        name: "",
        population: "",
        capital: "",
        flag: "https://c7.alamy.com/comp/2B1FW7T/national-flags-fabric-tags-g20-countries-labels-official-country-flag-tag-vector-set-2B1FW7T.jpg",
        id: Math.random().toString(36),
        rating: 0,
        deleted: false,
        originalIndex: countriesStaticData.length - 1,
      });
    }
  }

  function validateFields() {
    const errors = { name: "", population: "", capital: "" };

    if (newCountry.name.length < 5) {
      errors.name = "მინიმუმ 5 სიმბოლო";
    }
    if (!newCountry.population || isNaN(Number(newCountry.population))) {
      errors.population = "შეიყვანეთ მხოლოდ ციფრები";
    }
    if (!newCountry.capital) {
      errors.capital = "აუცილებელი ველი";
    }
    setErrorMessage(errors);

    return !errors.name && !errors.population && !errors.capital;
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
      <NewCountry
        handleChangeInput={handleChangeInput}
        handleSubmitNewCountry={handleSubmitNewCountry}
        value={newCountry}
        errorMessage={errorMessage}
      />
    </section>
  );
};
