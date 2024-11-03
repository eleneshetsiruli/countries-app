type Action =
    | { type: 'SET_DATA'; payload: CountryData[] }
    | { type: 'ADD_COUNTRY'; payload: CountryData }
    | { type: 'REMOVE_COUNTRY'; payload: string }
    | { type: 'INCREASE_RATING'; payload: string }
    | { type: 'UNDO_DELETE'; payload: string }
    | { type: 'UPDATE_COUNTRY'; payload: CountryData };

interface CountryData {
    name: { en: string; ka: string };
    population: string;
    flag: string;
    capital: { en: string; ka: string };
    id: string;
    rating: number;
    deleted?: boolean;
    originalIndex?: number;
}

export const countriesReducer = (
    state: CountryData[],
    action: Action,
): CountryData[] => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload.map((country, index) => ({
                ...country,
                originalIndex: index,
            })) as CountryData[];

        case 'ADD_COUNTRY': {
            const updatedStateWithNewCountry = [
                ...state,
                { ...action.payload, deleted: false },
            ];

            return updatedStateWithNewCountry.sort((a, b) => {
                if (a.deleted && !b.deleted) return 1;
                if (!a.deleted && b.deleted) return -1;
                return 0;
            });
        }

        case 'REMOVE_COUNTRY': {
            return state.filter((country) => country.id !== action.payload);
        }

        case 'INCREASE_RATING':
            return state.map((country) =>
                country.id === action.payload
                    ? { ...country, rating: country.rating + 1 }
                    : country,
            );

        case 'UPDATE_COUNTRY':
            return state.map((country) =>
                country.id === action.payload.id
                    ? { ...country, ...action.payload }
                    : country,
            );
        default:
            return state;
    }
};
