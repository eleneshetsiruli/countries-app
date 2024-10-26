import { Link, NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import styles from './Header.module.css';
import { headerTranslation } from './translation';

const handleActiveNav = ({ isActive }: NavLinkRenderProps) => {
    return isActive ? styles.activeNavItem : '';
};
const ela = '';
const gio = '';

export const Header = () => {
    const { lang } = useParams<string>();

    const currentLang: keyof typeof headerTranslation = (
        lang === 'en' || lang === 'ka' ? lang : 'en'
    ) as keyof typeof headerTranslation;

    const content = headerTranslation[currentLang];

    return (
        <div className={styles.header}>
            <h1>WorldFacts</h1>
            <NavLink className={handleActiveNav} to={'/'}>
                {content.home}
            </NavLink>
            <NavLink className={handleActiveNav} to={'about'}>
                {content.about}
            </NavLink>
            <NavLink className={handleActiveNav} to={'maps'}>
                {content.maps}
            </NavLink>
            <NavLink className={handleActiveNav} to={'contacts'}>
                {content.contact}
            </NavLink>
            <Link to={`${currentLang === 'en' ? '/ka/home' : '/en/home'}`}>
                {currentLang === 'en' ? 'ქართულად' : 'English'}
            </Link>
        </div>
    );
};
