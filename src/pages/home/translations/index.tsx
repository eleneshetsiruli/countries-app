export interface LanguageData {
    heroHedline: string;
    discover: string;
    country: string;
    people: string;
    find: string;
}

export interface transTypes {
    en: LanguageData;
    ka: LanguageData;
}

export const translations: transTypes = {
    en: {
        heroHedline: "Explore the World's Facts",
        discover:
            'Discover detailed information about countries around the globe.',
        country: '195 Countries',
        people: '7.8 Billion People',
        find: 'Find Countrie',
    },
    ka: {
        heroHedline: 'გამოიკვლიეთ მსოფლიოს ფაქტები',
        discover: 'აღმოაჩინეთ დეტალური ინფორმაცია მსოფლიოს ქვეყნების შესახებ',
        country: '195 ქვეყანა',
        people: '7.8 მილიარდი ადამიანი',
        find: 'მოიძიე ქვეყანა',
    },
};
