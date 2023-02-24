import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppCtx } from '../AppProvider';
import './login.css';
import './bg.css';
import logo from '../images/psu-logo.png'
import { Form } from "react-bootstrap";

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const { userInfo, action } = useAppCtx();
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
    .then(response => {
      console.log(response.user.uid);
      navigate('/');
    })
    .catch(error => {
      console.log(error);
      setAuthing(false);
    })
  }

  const signInByEMailPass = async () => {
    setAuthing(true);

    signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
    .then(response => {
      console.log(response.user.uid);
      if (response.user.email == '6510110060@psu.ac.th'){
        navigate('/announcement');
      }
      else {
        navigate('/home');
      }
      
    })
    .catch(error => {
      console.log(error);
      setAuthing(false);
    })
  }

  console.log('rendering..... login', auth.name)

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
                <p className="text sup">Faculty of Engineering for students</p>
              </div>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailRef} type="email" placeholder="email" />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  placeholder="password"
                />
              </Form.Group>
              <div className="field">
                <button className="login-btn" onClick={() => signInByEMailPass()} disabled={authing}>LOGIN</button>
              </div>
            </div>
        </div>
    </div>
)
}
export default Login;