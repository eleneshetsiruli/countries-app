import { useParams } from 'react-router-dom';
import styles from '../CountriesCard.module.css';
import { cardTranslations } from './country/translations';
interface DeleteBtnProps {
    removeCountry: () => void;
}

export const DeleteBtn = ({ removeCountry }: DeleteBtnProps) => {
    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];
    return (
        <button onClick={removeCountry} className={styles.deleteBtn}>
            {content.delete}
        </button>
    );
};
