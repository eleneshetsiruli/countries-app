import React from 'react';

export interface CountryData {
    name: { en: string; ka: string };
    population: string;
    flag: string;
    capital: { en: string; ka: string };
    id: string;
    rating: number;
    deleted?: boolean;
    originalIndex?: number;
}

export interface CountryProps {
    data: CountryData;
    removeCountry: (id: string) => () => void;
    deletedBtn: boolean | undefined;
    handleUndo: (id: string) => () => void;
    handleUpRating: (id: string) => () => void;
    dispatch: React.Dispatch<Action>;
}

export type Action =
    | { type: 'UNDO_DELETE'; payload: string }
    | { type: 'INCREASE_RATING'; payload: string }
    | { type: 'REMOVE_COUNTRY'; payload: string }
    | { type: 'SET_DATA'; payload: CountryData[] }
    | { type: 'ADD_COUNTRY'; payload: CountryData }
    | { type: 'UPDATE_COUNTRY'; payload: CountryData };
