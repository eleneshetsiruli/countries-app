import { httpClient } from '@/api';
import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';

export interface AddCountryResponse {
    data: CountryData;
}

export const addCountry = async (
    newCountry: CountryData,
): Promise<CountryData> => {
    try {
        const response = await httpClient.post<CountryData>(
            '/country',
            newCountry,
        );
        return response.data;
    } catch (error) {
        console.error('Error adding country:', error);
        throw error;
    }
};
