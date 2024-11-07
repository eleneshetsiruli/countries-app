import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';
import { AxiosResponse } from 'axios';

export const fetchCountries = async (): Promise<CountryData[]> => {
    try {
        const response: AxiosResponse<CountryData[]> =
            await httpClient.get('/country');
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};
