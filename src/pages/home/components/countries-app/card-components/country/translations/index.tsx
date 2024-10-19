export const cardTranslations = {
  en: {
    population: "population",
    Rating: "Rating",
    name: "name",
    like: "like",
    delete: "DELETE",
    undo: "undo",
    hightTo: "hight to low",
    lowTo: "Low to hight",
    countryName: "Country Name",
    capital: "Capital",
    add: "Add Country",
    errorName: "min 5 character",
    errorPop: "only numbers",
    errorMust: "required field",
  },
  ka: {
    population: "მოსახლეობა",
    Rating: "რეიტინგი",
    name: "სახელი",
    like: "ხმა",
    delete: "წაშლა",
    undo: "აღდგენა",
    hightTo: "ზევიდან-ქვევით",
    lowTo: "ქვევიდან-ზევიდთ",
    countryName: "ქვეყნის სახელი",
    capital: "დედაქალაქი",
    add: " დამატება",
    errorName: "მინიმუმ ხუთი სიმბოლო",
    errorPop: "მხოლოდ ციფრები",
    errorMust: "აუცილებელი ველი",
  },
} as const;

export interface CountryTypes {
  Georgia: {
    ka: string;
    en: string;
  };
  Ukraine: {
    ka: string;
    en: string;
  };
  Latvia: {
    ka: string;
    en: string;
  };
  Poland: {
    ka: string;
    en: string;
  };
}
export const CountryNameTranslations: Record<
  CountryNameKeys,
  { ka: string; en: string }
> = {
  Georgia: {
    ka: "საქართველო",
    en: "Georgia",
  },
  Ukraine: {
    ka: "უკრაინა",
    en: "Ukraine",
  },
  Latvia: {
    ka: "ლატვია",
    en: "Latvia",
  },
  Poland: { ka: "პოლონეთი", en: "Poland" },
};

export type CountryNameKeys = keyof CountryTypes;
