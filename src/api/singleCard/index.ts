import { httpClient } from '..';

export const fetchCountryById = async (id: string | undefined) => {
    try {
        const response = await httpClient.get(`/country/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching country by ID:', error);
        throw new Error('Failed to fetch country data');
    }
};
