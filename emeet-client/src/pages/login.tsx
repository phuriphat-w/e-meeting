import { useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from 'react-router-dom';
import { useAppCtx } from '../AppProvider';
import './login.css';
import './bg.css';
import logo from '../images/psu-logo.png'

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
      }, 1500)
    }
  }, [auth, userInfo.ready])

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing in</div>;
    case "signoutRedirect":
      return <div>Signing out</div>;
  }

  if (auth.isLoading) {
    return (
      <div className="Wrapper">
      <div className="dot-wave">
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
      </div>
      <div className="loading-text">
        Now Loading...
      </div>
    </div>)
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
      return (
      <div className="Wrapper">
        <div className="dot-wave">
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
        </div>
        <div className="loading-text">
          Now Loading...
        </div>
      </div>)
    }
  }

  return (
    <div className="main-login">
        <div className="login-container">
            <div className="login-left">
                <div className="psu-logo">
                    <img src={logo} />
                </div>
            </div>
            <div className="login-right">
              <div className="text-box">
                <h1 className="text header">E-Meeting</h1>
                <p className="text sup">Faculty of Engineering students</p>
              </div>
              <div className="field">
                <button className="login-btn" onClick={() => void auth.signinRedirect()}>LOGIN</button>
              </div>
            </div>
        </div>
    </div>
)
}
export default Login;