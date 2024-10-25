import { useParams } from 'react-router-dom';
import { aboutTranslation } from '../../translation';
import styles from './about.module.css';

export const AboutDescription = () => {
    const { lang } = useParams<string>();

    const currentLang: keyof typeof aboutTranslation = (
        lang === 'en' || lang === 'ka' ? lang : 'en'
    ) as keyof typeof aboutTranslation;

    const content = aboutTranslation[currentLang];
    return (
        <div className={styles.aboutContent}>
            <p>{content.content}</p>
        </div>
    );
};
