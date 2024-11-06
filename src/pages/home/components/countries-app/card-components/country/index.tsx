import {
    CardDetails,
    CardContent,
    CardImg,
    CardTitle,
    SingleCard,
    LikeButton,
    DeleteBtn,
} from '../../././../../../../data/index';
import { CountryData, CountryProps } from '../interfaces';
import styles from '../../CountriesCard.module.css';
import { useParams } from 'react-router-dom';
import { cardTranslations } from './translations';
import React, { useState } from 'react';
import { EditButton } from '../../EditButton';
import EditCountryForm from '../newCountry';
import { handleEditCountry } from '@/api/editCountry';

export const Country: React.FC<CountryProps> = ({
    data,
    handleUpRating,
    removeCountry,
    deletedBtn,
    dispatch,
}) => {
    const formattedPopulation = data.population.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' ',
    );

    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';

    const content = cardTranslations[currentLang];

    const countryName = data.name[currentLang];

    const [editingCountry, setEditingCountry] = useState<CountryData | null>(
        null,
    );

    const updateCountry = async (updatedCountry: CountryData) => {
        try {
            const updated = await handleEditCountry(updatedCountry);
            dispatch({ type: 'UPDATE_COUNTRY', payload: updated });
        } catch (error) {
            console.error('Error updating country:', error);
        }
    };

    return (
        <>
            {editingCountry ? (
                <EditCountryForm
                    country={editingCountry}
                    onSave={(updatedCountry) => {
                        updateCountry(updatedCountry);
                        setEditingCountry(null);
                    }}
                    onCancel={() => setEditingCountry(null)}
                />
            ) : (
                <SingleCard
                    renderId={data.id}
                    renderTitle={<CardTitle title={countryName} />}
                    renderImg={<CardImg img={data.flag} />}
                    deletedBtn={deletedBtn}
                >
                    <CardContent>
                        <CardDetails
                            label={content.population}
                            content={formattedPopulation}
                        />
                        <div className={styles.ratingBox}>
                            <CardDetails
                                label={content.Rating}
                                content={data.rating}
                            />
                        </div>
                    </CardContent>
                    <div className={styles.likeDeleteBox}>
                        <LikeButton handleUpRating={handleUpRating(data.id)} />
                        {!data.deleted && (
                            <DeleteBtn removeCountry={removeCountry(data.id)} />
                        )}
                        <EditButton onEdit={() => setEditingCountry(data)} />
                    </div>
                </SingleCard>
            )}
        </>
    );
};
