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
    handleUpRating: (id: string) => () => void;
    dispatch: React.Dispatch<Action>;
    handleDelete: (id: string) => void;
    disabled: boolean;
}

export interface PaginatedResponse {
    data: CountryData[];
    first: number;
    items: number;
    last: number;
    next: number | null;
    pages: number;
    prev: number | null;
}

export type Action =
    | { type: 'UNDO_DELETE'; payload: string }
    | { type: 'INCREASE_RATING'; payload: string }
    | { type: 'REMOVE_COUNTRY'; payload: string }
    | { type: 'SET_DATA'; payload: CountryData[] | undefined }
    | { type: 'ADD_COUNTRY'; payload: CountryData | undefined }
    | { type: 'UPDATE_COUNTRY'; payload: CountryData };
