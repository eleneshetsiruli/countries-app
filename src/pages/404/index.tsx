import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div>
            <p>404 Page Not Found</p>
            <Link to={'/'}>go to Home page</Link>
        </div>
    );
};
export default NotFoundPage;
