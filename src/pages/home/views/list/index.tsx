import { useParams } from 'react-router-dom';
import { CountriesCard } from '../../components/countries-app/CountriesCard';
import { HeroSection } from '../../components/hero-component/HeroSection';
import { translations } from '../../translations';

export const CardView = () => {
    const { lang } = useParams<string>();
    const currentLang: keyof typeof translations = (
        lang === 'en' || lang === 'ka' ? lang : 'en'
    ) as keyof typeof translations;
    return (
        <>
            <HeroSection lang={currentLang} />
            <CountriesCard />
        </>
    );
};

export default CardView;
