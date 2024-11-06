import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';

export const fetchCountryById = async (
    id: string | undefined,
): Promise<CountryData> => {
    try {
        const response = await httpClient.get<CountryData>(`/country/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country:', error);
        throw error;
    }
};
