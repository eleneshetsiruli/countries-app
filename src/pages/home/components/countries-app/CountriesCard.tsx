import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import styles from './CountriesCard.module.css';
import { Action, CountryData } from './card-components/interfaces/index.tsx';
import {
    SortingOptions,
    countriesReducer,
    NewCountry,
} from '../../../../data/index.ts';
import { Country } from './card-components/country/index.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { cardTranslations } from './card-components/country/translations/index.tsx';
import { addCountry } from '@/api/addCountry/index.tsx';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { fetchCountries } from '@/api/countries/index.ts';
import { queryClient } from '@/main.tsx';
import { deleteCountry } from '@/api/deleteCountry/index.tsx';
import { useVirtualizer } from '@tanstack/react-virtual';

export const CountriesCard = () => {
    const [countriesStaticData, dispatch] = useReducer<
        React.Reducer<CountryData[], Action>
    >(countriesReducer, []);
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        population: '',
        capital: '',
    });

    const [newCountEng, setNewCountEng] = useState(true);
    const [newCountGeo, setNewCountGeo] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const [perPage] = useState(10);
    const [sortOrder, setSortOrder] = useState<string>('rating');

    const parentRef = useRef<HTMLDivElement | null>(null);

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

    interface PaginatedResponse {
        data: any[];
        first: number;
        items: number;
        last: number;
        next: number | null;
        pages: number;
        prev: number | null;
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery<PaginatedResponse, Error>({
            queryKey: ['countries', sortOrder],
            queryFn: async ({ pageParam = 1 }: any) => {
                const response = await fetchCountries(
                    { pageParam },
                    sortOrder,
                    perPage,
                );

                return {
                    data: response.data,
                    first: response.first,
                    items: response.items,
                    last: response.last,
                    next: response.next,
                    pages: response.pages,
                    prev: response.prev,
                };
            },
            getNextPageParam: (lastPage) => {
                if (lastPage?.next) {
                    return lastPage?.next;
                }
            },

            initialPageParam: 1,
            enabled: true,
        });

    const countrie = data?.pages.flatMap((page) => page.data) ?? [];

    const rowVirtualizer = useVirtualizer({
        count: countrie.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 320,
        overscan: 35,
    });

    const virtualItems = rowVirtualizer.getVirtualItems();
    useEffect(() => {
        if (data) {
            rowVirtualizer.measure();
        }
    }, [data]);

    useEffect(() => {
        const urlSort = searchParams.get('sort');
        if (urlSort && urlSort !== sortOrder) {
            setSortOrder(urlSort === 'rating' ? 'rating' : '-rating');
        }
    }, [searchParams]);

    const handleSortChange = (newSortValue: 'rating' | '-rating') => {
        setSearchParams({ sort: newSortValue });
        setSortOrder(newSortValue);
    };

    const handleScroll = useCallback(() => {
        if (parentRef.current) {
            const bottom =
                parentRef.current.scrollHeight ===
                parentRef.current.scrollTop + parentRef.current.clientHeight;

            if (bottom && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        const container = parentRef.current;

        if (container) {
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <>
            <section className={styles.cardSection}>
                <SortingOptions onChange={handleSortChange} />

                <div ref={parentRef} className={styles.container}>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '50px',
                            width: 700,
                        }}
                    >
                        {virtualItems?.map((virtualItem) => {
                            const element = countrie?.[virtualItem.index];
                            if (!element) {
                                return (
                                    <div key={virtualItem.index}>
                                        Loading...
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={element.id}
                                    className={styles.singleCardWrapper}
                                >
                                    <Country
                                        handleUpRating={handleUpRating}
                                        data={element}
                                        dispatch={dispatch}
                                        handleDelete={handleDelete}
                                        disabled={isPending}
                                    />
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
