import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';
import { AxiosResponse } from 'axios';

export const fetchCountries = async (
    sortOrder: string,
): Promise<CountryData[]> => {
    try {
        const response: AxiosResponse<CountryData[]> = await httpClient.get(
            `/country?_sort=${sortOrder}`,
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};
