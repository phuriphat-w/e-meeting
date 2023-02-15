import { useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from 'react-router-dom';
import { useAppCtx } from '../AppProvider';
import './login.css';
import './bg.css';

function Login() {
  const { userInfo, action } = useAppCtx();
  const auth = useAuth();
  const location = useLocation();

  console.log('rendering..... login', auth.user)
  useEffect(() => {
    if (auth.isAuthenticated) {
      setTimeout(() => {
        action.setUserInfo({
          ready: true,
          username: auth.user?.profile.preferred_username,
          displayName: auth.user?.profile.given_name + ' ' + auth.user?.profile.family_name
        })
      }, 1000)
    }
  }, [auth, userInfo.ready])

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing in</div>;
    case "signoutRedirect":
      return <div>Signing out</div>;
  }

  if (auth.isLoading) {
    return <div>Now Loading</div>;
  }

  if (auth.error) {
    return <div>Something went wrong! {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    if (userInfo.ready) {
      const backTo = location.state?.backTo || '/home'
      return (
        <Navigate to={backTo} replace />
      );
    } else {
      return <div>Wait a few seconds</div>;
    }
  }

  return (
    <div className="login-container">
      <div className="box-container">
        <div className="logo-container">
        </div>
        <div className="text-content-wrapper">
          <div className="text-content"> </div>
        </div>
        <div className="button-container">
          <button className="login-button" onClick={() => void auth.signinRedirect()}>
            LOG-IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;