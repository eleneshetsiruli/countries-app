import { Link, useParams } from 'react-router-dom';
import styles from '../CountriesCard.module.css';
import React from 'react';
type SingleCardProps = {
    children: React.ReactNode;
    renderTitle: React.ReactNode;
    renderImg: React.ReactNode;
    renderId: React.ReactNode;
    deletedBtn?: boolean;
};

export const SingleCard = ({
    children,
    renderTitle,
    renderImg,
    renderId,
}: SingleCardProps) => {
    const { lang } = useParams();

    return (
        <div className={styles.singleCard}>
            <Link to={`/${lang}/cards/${renderId}`}>
                {renderTitle}
                {renderImg}
            </Link>
            {children}
        </div>
    );
};
