import { useParams } from 'react-router-dom';
import { cardTranslations } from './country/translations';

interface DeleteBtnProps {
    onClick: () => void;
    disabled: boolean;
}

export const DeleteBtn = ({ onClick, disabled }: DeleteBtnProps) => {
    const { lang } = useParams<{ lang?: string }>();
    const currentLang: keyof typeof cardTranslations =
        lang === 'en' || lang === 'ka' ? lang : 'en';
    const content = cardTranslations[currentLang];

    return (
        <button disabled={disabled} onClick={onClick}>
            {content.delete}
        </button>
    );
};
