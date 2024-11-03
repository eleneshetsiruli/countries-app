import { useParams } from 'react-router-dom';
import styles from './singlePage.module.css';
import { CardDetails, CardTitle } from '@/data';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface countryfetchingDataProps {
    name: {
        en: string;
        ka: string;
    };
    flag: string;
    population: number;
    capital: {
        en: string;
        ka: string;
    };
}

export const SingleCardContent = () => {
    const [getData, setGetData] = useState<countryfetchingDataProps>();
    const { id, lang } = useParams();
    const currentLang = lang === 'en' || lang === 'ka' ? lang : 'en';

    useEffect(() => {
        axios
            .get(`http://localhost:3000/country/${id}`)
            .then((response) => {
                setGetData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
