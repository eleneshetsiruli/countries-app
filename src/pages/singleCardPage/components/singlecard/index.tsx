import { useParams } from 'react-router-dom';
import styles from './singlePage.module.css';
import { CardDetails, CardTitle } from '@/data';
import { fetchCountryById } from '@/api/singleCard';
import { useQuery } from '@tanstack/react-query';

interface countryfetchingDataProps {
    name: { en: string; ka: string };
    population: string;
    flag: string;
    capital: { en: string; ka: string };
    id: string | undefined;
    rating: number;
    deleted?: boolean;
    originalIndex?: number;
}

export const SingleCardContent = () => {
    const { id, lang } = useParams();
    const currentLang = lang === 'en' || lang === 'ka' ? lang : 'en';

    const { data, isLoading, isError, error } =
        useQuery<countryfetchingDataProps>({
            queryKey: ['country', id],
            queryFn: () => fetchCountryById(id),
        });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div className={styles.singleContainer}>
            <CardTitle
                title={data?.name?.[currentLang] || 'No name available'}
            />
            <img src={data?.flag} alt="flag" />
            <CardDetails
                label={'Population'}
                content={data?.population || 'N/A'}
            />
            <CardDetails
                label={'Capital'}
                content={data?.capital?.[currentLang] || 'No capital available'}
            />
        </div>
    );
};
