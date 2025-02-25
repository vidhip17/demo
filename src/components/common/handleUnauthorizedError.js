import { useNavigate } from 'react-router-dom';

const useUnauthorizedError = () => {
    const navigate = useNavigate();

    const handleUnauthorizedError = (error) => {
        if (error.response && error.response.status === 401) {
            navigate('/oops');
        } 
    };

    return handleUnauthorizedError;
};

export default useUnauthorizedError;

