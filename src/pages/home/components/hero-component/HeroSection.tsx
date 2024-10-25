import React from 'react';
import { translations } from '../../translations';
import styles from './Hero.module.css';
type Lang = keyof typeof translations;
interface HeroSectionProps {
    lang: Lang;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
    const content = translations[lang];
    return (
        <div className={styles.heroSectionContainer}>
            <div className={styles.heroContent}>
                <h2>{content.heroHedline}</h2>
                <h3>{content.discover}</h3>
                <p>{content.country}</p>
                <p>{content.people}</p>
            </div>
            <div className={styles.searchContent}>
                <input
                    className={styles.findInput}
                    type="text"
                    placeholder={content.find}
                />
                <button className={styles.arrowLogo}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
