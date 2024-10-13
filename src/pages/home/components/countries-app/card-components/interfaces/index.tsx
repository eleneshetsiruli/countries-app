export interface CountryData {
  name: string;
  population: string;
  flag: string;
  capital: string;
  id: string;
  rating: number;
  deleted?: boolean;
  originalIndex?: number;
}

export interface CountryProps {
  data: CountryData;
  removeCountry: (id: string) => () => void;
  deletedBtn: boolean | undefined;
  handleUndo: (id: string) => () => void;
  handleUpRating: (id: string) => () => void;
}

export type Action =
  | { type: "UNDO_DELETE"; payload: string }
  | { type: "INCREASE_RATING"; payload: string }
  | { type: "REMOVE_COUNTRY"; payload: string }
  | { type: "SET_DATA"; payload: CountryData[] }
  | { type: "ADD_COUNTRY"; payload: CountryData };
