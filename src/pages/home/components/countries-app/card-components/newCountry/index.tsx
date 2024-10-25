import { useParams } from 'react-router-dom';
import styles from './newCountry.module.css';
import { cardTranslations } from '../country/translations';
import React from 'react';

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
