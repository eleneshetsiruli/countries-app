import { useParams } from 'react-router-dom';
import styles from './newCountry.module.css';
import { cardTranslations } from '../country/translations';
import React, { useState } from 'react';
import axios from 'axios';
import { CountryData } from '../interfaces';

interface NewCountryProps {
    handleSubmitNewCountry: (ev: React.FormEvent<HTMLFormElement>) => void;
    handleChangeInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    setNewCountEng: React.Dispatch<React.SetStateAction<boolean>>;
    setNewCountGeo: React.Dispatch<React.SetStateAction<boolean>>;

    value: {
        name: { en: string; ka: string };
        population: string;
        capital: { en: string; ka: string };
        flag: string;
        id: string;
        rating: number;
        deleted: boolean;
        originalIndex: number;
    };
    errorMessage: {
        name: string;
        population: string;
        capital: string;
    };
    newCountEng: boolean;
    newCountGeo: boolean;
}

interface EditCountryFormProps {
    country: CountryData;
    onSave: (updatedCountry: CountryData) => void;
    onCancel: () => void;
}

const EditCountryForm: React.FC<EditCountryFormProps> = ({
    country,
    onSave,
}) => {
    const [name, setName] = useState(country.name);
    const [population, setPopulation] = useState(country.population);
    const [capital, setCapital] = useState(country.capital);
    const [rating, setRating] = useState(country.rating);
    const [flag, setFlag] = useState(country.flag);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedCountry = {
            ...country,
            name,
            population,
            capital,
            rating,
            flag,
        };

        try {
            await axios.put(
                `http://localhost:3000/country/${country.id}`,
                updatedCountry,
            );
            onSave(updatedCountry);
        } catch (error) {
            console.error('Error updating country:', error);
        }
    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <input
                type="text"
                value={name.en}
                onChange={(e) => setName({ ...name, en: e.target.value })}
                placeholder="Country Name (EN)"
            />
            <input
                type="text"
                value={name.ka}
                onChange={(e) => setName({ ...name, ka: e.target.value })}
                placeholder="Country Name (KA)"
            />
            <input
                type="text"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
                placeholder="Population"
            />
            <input
                type="text"
                value={capital.en}
                onChange={(e) => setCapital({ ...capital, en: e.target.value })}
                placeholder="Capital (EN)"
            />
            <input
                type="text"
                value={capital.ka}
                onChange={(e) => setCapital({ ...capital, ka: e.target.value })}
                placeholder="Capital (KA)"
            />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                placeholder="Rating"
            />
            <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Flag URL"
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditCountryForm;

export const NewCountry = ({
    handleSubmitNewCountry,
    handleChangeInput,
    handleChangeFile,
    setNewCountEng,
    setNewCountGeo,
    value,
    errorMessage,
    newCountEng,
    newCountGeo,
}: NewCountryProps) => {
    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];

    function handleNextInputs() {
        setNewCountEng(false);
        setNewCountGeo(true);
    }

    function handleBackInputs() {
        setNewCountEng(true);
        setNewCountGeo(false);
    }

    return (
        <form className={styles.countryForm} onSubmit={handleSubmitNewCountry}>
            {newCountEng && (
                <div>
                    <div className={styles.inputsBox}>
                        <div>
                            <input
                                value={value.name.en}
                                name="name_en"
                                type="text"
                                placeholder={content.countryName}
                                onChange={handleChangeInput}
                            />
                            <p className={styles.errorMessage}>
                                {' '}
                                {errorMessage.name}
                            </p>
                        </div>

                        <div>
                            <input
                                value={value.population}
                                name="population"
                                type="text"
                                placeholder={content.population}
                                onChange={handleChangeInput}
                            />
                            <p className={styles.errorMessage}>
                                {' '}
                                {errorMessage.population}
                            </p>
                        </div>
                        <div>
                            <input
                                value={value.capital.en}
                                name="capital_en"
                                type="text"
                                placeholder={content.capital}
                                onChange={handleChangeInput}
                            />
                            <p className={styles.errorMessage}>
                                {' '}
                                {errorMessage.capital}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {newCountEng && (
                <button onClick={handleNextInputs}>{content.next}⇢</button>
            )}
            {newCountGeo && (
                <button onClick={handleBackInputs}>⇠{content.back}</button>
            )}

            {newCountGeo && (
                <div className={styles.inputsBox}>
                    <input
                        onChange={handleChangeInput}
                        name="name_ka"
                        type="text"
                        placeholder={content.nameGeorgian}
                        value={value.name.ka}
                    />
                    <p className={styles.errorMessage}> {errorMessage.name}</p>
                    <input
                        onChange={handleChangeInput}
                        name="capital_ka"
                        type="text"
                        placeholder={content.capitalGeorgian}
                        value={value.capital.ka}
                    />

                    <input
                        className={styles.fileInput}
                        type="file"
                        name="flag"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChangeFile}
                    />
                    <p className={styles.errorMessage}>
                        {' '}
                        {errorMessage.capital}
                    </p>
                    <button type="submit">{content.add}</button>
                </div>
            )}
        </form>
    );
};
