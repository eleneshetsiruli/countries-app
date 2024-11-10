import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';
import { AxiosResponse } from 'axios';

interface PaginatedCountriesResponse {
    data: CountryData[];
    totalCount: number;
    pageCount: number;
}

export const fetchCountries = async (
    sortOrder: string,
    page: number,
    perPage: number,
): Promise<CountryData[]> => {
    try {
        const response: AxiosResponse<PaginatedCountriesResponse> =
            await httpClient.get(
                `/country?_sort=${sortOrder}&_page=${page}&_per_page=${perPage}`,
            );

        return response.data.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};
