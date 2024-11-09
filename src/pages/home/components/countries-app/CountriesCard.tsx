import React, { ChangeEvent, useReducer, useRef, useState } from 'react';
import styles from './CountriesCard.module.css';
import { Action, CountryData } from './card-components/interfaces/index.tsx';
import {
    SortingOptions,
    countriesReducer,
    NewCountry,
} from '../../../../data/index.ts';
import { Country } from './card-components/country/index.tsx';
import { useParams } from 'react-router-dom';
import { cardTranslations } from './card-components/country/translations/index.tsx';
import { addCountry } from '@/api/addCountry/index.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCountries } from '@/api/countries/index.ts';
import { queryClient } from '@/main.tsx';
import { deleteCountry } from '@/api/deleteCountry/index.tsx';
import { useVirtualizer } from '@tanstack/react-virtual';

export const CountriesCard = () => {
    const [countriesStaticData, dispatch] = useReducer<
        React.Reducer<CountryData[], Action>
    >(countriesReducer, []);

    const { mutate: deleteMutation, isPending } = useMutation({
        mutationFn: (id: string) => deleteCountry(id),
        onMutate: async (id) => {
            const previousCountries = countriesStaticData;
            dispatch({ type: 'REMOVE_COUNTRY', payload: id });

            return { previousCountries };
        },
        onError: (error, _, context) => {
            dispatch({ type: 'SET_DATA', payload: context?.previousCountries });
            console.error('Error deleting country:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['countries'] });
        },
    });

    const handleDelete = (id: string) => {
        deleteMutation(id);
    };

    const [errorMessage, setErrorMessage] = useState({
        name: '',
        population: '',
        capital: '',
    });

    const [newCountry, setNewCountry] = useState({
        name: { en: '', ka: '' },
        population: '',
        capital: { en: '', ka: '' },
        flag: '',
        id: Math.random().toString(36),
        rating: 0,
        deleted: false,
        originalIndex: countriesStaticData.length - 1,
    });
    const [newCountEng, setNewCountEng] = useState(true);
    const [newCountGeo, setNewCountGeo] = useState(false);

    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];

    function handleChangeInput(ev: ChangeEvent<HTMLInputElement>) {
        const { name, value } = ev.target;

        if (name === 'name_en' || name === 'name_ka') {
            setNewCountry((prev) => ({
                ...prev,
                name: {
                    ...prev.name,
                    [name === 'name_en' ? 'en' : 'ka']: value,
                },
            }));

            if (value.length < 5) {
                setErrorMessage((prev) => ({
                    ...prev,
                    name: 'მინიმუმ 5 სიმბოლო',
                }));
            } else {
                setErrorMessage((prev) => ({
                    ...prev,
                    name: '',
                }));
            }
        }

        if (name === 'capital_en' || name === 'capital_ka') {
            const langKey = name === 'capital_en' ? 'en' : 'ka';
            setNewCountry((prev) => ({
                ...prev,
                capital: {
                    ...prev.capital,
                    [langKey]: value,
                },
            }));

            if (!value) {
                setErrorMessage((prev) => ({
                    ...prev,
                    capital: 'აუცილებელი ველი',
                }));
            } else {
                setErrorMessage((prev) => ({
                    ...prev,
                    capital: '',
                }));
            }
        }

        if (name === 'population') {
            setNewCountry((prev) => ({ ...prev, population: value }));

            if (!value) {
                setErrorMessage((prev) => ({
                    ...prev,
                    population: 'აუცილებელი ველი',
                }));
            } else if (isNaN(Number(value)) || Number(value) <= 0) {
                setErrorMessage((prev) => ({
                    ...prev,
                    population: 'შეიყვანეთ მხოლოდ დადებითი რიცხვი',
                }));
            } else {
                setErrorMessage((prev) => ({ ...prev, population: '' }));
            }
        }
    }

    const handleUpRating = (id: string) => () => {
        dispatch({ type: 'INCREASE_RATING', payload: id });
    };

    function handleChangeOption(ev: ChangeEvent<HTMLSelectElement>) {
        const nonDeletedCards = countriesStaticData.filter(
            (country) => !country.deleted,
        );
        const deletedCards = countriesStaticData.filter(
            (country) => country.deleted,
        );

        const sortedNonDeletedCards: CountryData[] = nonDeletedCards.sort(
            (a, b) => {
                if (ev.target.value === 'hight') {
                    return b.rating - a.rating;
                } else if (ev.target.value === 'low') {
                    return a.rating - b.rating;
                }
                return 0;
            },
        );

        const finalSortedCards = [...sortedNonDeletedCards, ...deletedCards];

        dispatch({ type: 'SET_DATA', payload: finalSortedCards });
    }

    const { mutate } = useMutation({
        mutationFn: (newCountry: CountryData) => addCountry(newCountry),
        onMutate: async (newCountry) => {
            const previousCountries = countriesStaticData;
            dispatch({ type: 'ADD_COUNTRY', payload: newCountry });

            return { previousCountries };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['countries'],
            });

            setNewCountry({
                name: { en: '', ka: '' },
                population: '',
                capital: { en: '', ka: '' },
                flag: '',
                id: Math.random().toString(36),
                rating: 0,
                deleted: false,
                originalIndex: countriesStaticData.length,
            });
            setNewCountEng(true);
            setNewCountGeo(false);
        },
        onError: (error, newCountry) => {
            dispatch({
                type: 'ADD_COUNTRY',
                payload: newCountry,
            });
            console.error('Error adding country:', error);
        },
    });

    const handleSubmitNewCountry = async (
        ev: React.FormEvent<HTMLFormElement>,
    ) => {
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

        mutate(freshCountry);
    };

    function validateFields() {
        if (newCountry.name.en.length < 5 || newCountry.name.ka.length < 5) {
            setErrorMessage((prev) => ({
                ...prev,
                name: 'Minimum 5 characters required',
            }));
            return false;
        }
        if (
            !newCountry.population ||
            isNaN(Number(newCountry.population)) ||
            Number(newCountry.population) <= 0
        ) {
            setErrorMessage((prev) => ({
                ...prev,
                population: 'Please enter a valid positive number',
            }));
            return false;
        }
        if (!newCountry.capital.en || !newCountry.capital.ka) {
            setErrorMessage((prev) => ({
                ...prev,
                capital: 'Both English and Georgian capital names are required',
            }));
            return false;
        }
        return true;
    }

    const handleChangeFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;

                setNewCountry((prevValue) => ({
                    ...prevValue,
                    flag: base64String,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    function handleClickedEnglish() {
        setNewCountEng(true);
        setNewCountGeo(false);
    }

    function handleClickGeorgian() {
        setNewCountEng(false);
        setNewCountGeo(true);
    }

    const {
        data,
        isError: queryError,
        isLoading: queryLoad,
    } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
        retry: 0,
    });
    const countriesData = data ?? [];

    const parentRef = useRef(null);
    const rowVirtualizer = useVirtualizer({
        count: countriesData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 300,
        overscan: 30,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();

    return (
        <>
            {queryLoad ? 'Loading...' : null}
            {queryError ? 'Error' : null}

            <section className={styles.cardSection}>
                <SortingOptions onChange={handleChangeOption} />

                <div ref={parentRef} className={styles.container}>
                    <div
                        className={styles.innerContainer}
                        style={{
                            height: 3800,
                        }}
                    >
                        {virtualItems?.map((virtualRow) => {
                            const element = data?.[virtualRow.index];

                            return (
                                <div
                                    key={virtualRow.key}
                                    className={styles.singleCardWrapper}
                                >
                                    {element && (
                                        <Country
                                            handleUpRating={handleUpRating}
                                            data={element}
                                            dispatch={dispatch}
                                            handleDelete={handleDelete}
                                            disabled={isPending}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.newCountryBox}>
                    <div className={styles.langBox}>
                        <button
                            className={`${newCountEng ? styles.transparant : ''}`}
                            onClick={handleClickedEnglish}
                        >
                            {content.english}
                        </button>
                        <button
                            className={`${newCountGeo ? styles.transparant : ''}`}
                            onClick={handleClickGeorgian}
                        >
                            {content.georgian}
                        </button>
                    </div>
                    <NewCountry
                        setNewCountEng={setNewCountEng}
                        setNewCountGeo={setNewCountGeo}
                        newCountEng={newCountEng}
                        newCountGeo={newCountGeo}
                        handleChangeInput={handleChangeInput}
                        handleSubmitNewCountry={handleSubmitNewCountry}
                        value={newCountry}
                        errorMessage={errorMessage}
                        handleChangeFile={handleChangeFile}
                    />
                </div>
            </section>
        </>
    );
};
