import { PaginatedResponse } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';

export const fetchCountries = async (
    { pageParam = 1 }: { pageParam?: number },
    sortOrder: string,
    perPage: number,
): Promise<PaginatedResponse> => {
    try {
        const response = await httpClient.get(
            `/country?_sort=${sortOrder}&_page=${pageParam}&_per_page=${perPage}`,
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries');
    }
};
