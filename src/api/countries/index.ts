import {
    Action,
    CountryData,
} from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';
import React from 'react';

export const fetchCountries = async (dispatch: React.Dispatch<Action>) => {
    try {
        const response = await httpClient.get<CountryData[]>('/country');

        dispatch({ type: 'SET_DATA', payload: response.data });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
