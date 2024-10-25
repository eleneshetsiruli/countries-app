import { useParams } from 'react-router-dom';
import styles from './undoBtn.module.css';
import { cardTranslations } from '../country/translations';
import React from 'react';

interface UndoButtonProps {
    handleUndo: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const UndoBtn: React.FC<UndoButtonProps> = ({ handleUndo }) => {
    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];
    return (
        <button className={styles.undoBtn} onClick={handleUndo}>
            {content.undo}
        </button>
    );
};
