import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { cardTranslations } from './country/translations';
import styles from '../CountriesCard.module.css';

interface SortingOptionsProps {
    onChange: (newSort: 'rating' | '-rating') => void;
}

export const SortingOptions: React.FC<SortingOptionsProps> = ({ onChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];

    const sortOption = searchParams.get('sort') || '-rating';

    const [selectValue, setSelectValue] = useState(sortOption);

    useEffect(() => {
        setSelectValue(sortOption);
    }, [sortOption]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newSort = event.target.value as 'rating' | '-rating';

        setSearchParams({ sort: newSort });

        onChange(newSort);
    };

    return (
        <select
            value={selectValue}
            className={styles.selectContainer}
            onChange={handleSelectChange}
        >
            <option value="rating">{content.lowTo}</option>
            <option value="-rating">{content.hightTo}</option>
        </select>
    );
};
