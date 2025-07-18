import React, { useEffect, useState } from 'react';
import { useMockAuth } from '../components/MockAuth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const { currentUser } = useMockAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            console.log('unauthorized')
            navigate('/login');
        } else {
            setLoading(false);
        }
    });

    if (loading) return <p>loading ...</p>

    return <>{children}</>;
};

export default AuthRoute;