import { CountryData } from '@/pages/home/components/countries-app/card-components/interfaces';
import { httpClient } from '..';

export const handleEditCountry = async (
    updatedCountry: CountryData,
): Promise<CountryData> => {
    try {
        const response = await httpClient.put<CountryData>(
            `/country/${updatedCountry.id}`,
            updatedCountry,
        );
        return response.data;
    } catch (error) {
        console.error('Error updating country:', error);
        throw error;
    }
};
