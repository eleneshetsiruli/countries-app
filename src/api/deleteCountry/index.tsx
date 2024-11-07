import { httpClient } from '..';

export const deleteCountry = async (id: string) => {
    try {
        const response = await httpClient.delete(`/country/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting country:', error);
        throw new Error('Failed to delete country');
    }
};
