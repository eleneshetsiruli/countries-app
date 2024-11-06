import { httpClient } from '../index';

interface DeleteCountryResponse {
    message: string;
}

export const deleteCountry = async (
    id: string,
): Promise<DeleteCountryResponse> => {
    try {
        const response = await httpClient.delete<DeleteCountryResponse>(
            `/country/${id}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting country:', error);
        throw error;
    }
};
