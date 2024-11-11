import {
    CardDetails,
    CardContent,
    CardImg,
    CardTitle,
    SingleCard,
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
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/main';

export const Country: React.FC<CountryProps> = ({
    disabled,
    data,
    dispatch,
    handleDelete,
}) => {
    const formattedPopulation = data?.population.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' ',
    );

    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';

    const content = cardTranslations[currentLang];

    const countryName = data?.name[currentLang];

    const [editingCountry, setEditingCountry] = useState<CountryData | null>(
        null,
    );

    const { mutate } = useMutation({
        mutationFn: (updatedCountry: CountryData) =>
            handleEditCountry(updatedCountry),
        onMutate: async (updatedCountry) => {
            const previousData = data;
            dispatch({ type: 'UPDATE_COUNTRY', payload: updatedCountry });
            return { previousData };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['countries'] });
            setEditingCountry(null);
        },
        onError: (error, _, context) => {
            if (context?.previousData)
                dispatch({
                    type: 'UPDATE_COUNTRY',
                    payload: context?.previousData,
                });
            console.error('Error updating country:', error);
        },
    });

    const updateCountry = (updatedCountry: CountryData) => {
        mutate(updatedCountry);
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
                    renderId={data?.id}
                    renderTitle={<CardTitle title={countryName} />}
                    renderImg={<CardImg img={data?.flag} />}
                >
                    <CardContent>
                        <CardDetails
                            label={content.population}
                            content={formattedPopulation}
                        />
                        <div className={styles.ratingBox}>
                            <CardDetails
                                label={content.Rating}
                                content={data?.rating}
                            />
                        </div>
                    </CardContent>
                    <div className={styles.likeDeleteBox}>
                        <DeleteBtn
                            disabled={disabled}
                            onClick={() => handleDelete(data.id)}
                        />
                        <EditButton onEdit={() => setEditingCountry(data)} />
                    </div>
                </SingleCard>
            )}
        </>
    );
};
