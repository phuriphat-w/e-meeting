import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MeetInfoList from '../pages/meet-info';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AuthCheck();
    }, []);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user){
            setLoading(false);
        } else {
            console.log('unautherized')
            navigate('/login');
        }
    })

    if (loading) return <p>loading ...</p>

    if (auth.currentUser?.email !== '6510110060@psu.ac.th')
    {
        return <MeetInfoList/>
    }

    return <>{children}</>;
};

export default AuthRoute;