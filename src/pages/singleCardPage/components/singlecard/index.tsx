import { useParams } from 'react-router-dom';
import styles from './singlePage.module.css';
import { CardDetails, CardTitle } from '@/data';
import { useEffect, useState } from 'react';
import { fetchCountryById } from '@/api/singleCard';

// interface countryfetchingDataProps {
//     name: {
//         en: string;
//         ka: string;
//     };
//     flag: string;
//     population: number;
//     capital: {
//         en: string;
//         ka: string;
//     };
// }

interface countryfetchingDataProps {
    name: { en: string; ka: string };
    population: string;
    flag: string;
    capital: { en: string; ka: string };
    id: string;
    rating: number;
    deleted?: boolean;
    originalIndex?: number;
}

export const SingleCardContent = () => {
    const [getData, setGetData] = useState<countryfetchingDataProps>();
    const { id, lang } = useParams();
    const currentLang = lang === 'en' || lang === 'ka' ? lang : 'en';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countryData = await fetchCountryById(id);
                setGetData(countryData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.singleContainer}>
            <CardTitle
                title={getData?.name?.[currentLang] || 'No name available'}
            />
            <img src={getData?.flag} alt="flag" />
            <CardDetails
                label={'Population'}
                content={getData?.population || 'N/A'}
            />
            <CardDetails
                label={'Capital'}
                content={
                    getData?.capital?.[currentLang] || 'No capital available'
                }
            />
        </div>
    );
};
