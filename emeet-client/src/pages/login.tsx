import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import './bg.css';
import logo from '../images/psu-logo.png'
import Swal from 'sweetalert2'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInByEMailPass = async () => {
    setAuthing(true);

    signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
    .then(response => {
      console.log(response.user.uid);
    
      if (response.user.email === '6510110060@psu.ac.th'){
        navigate('/announcement');
      }
      else {
        navigate('/home');
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'ล็อกอินสำเร็จ',
        showConfirmButton: false,
      })
    })
    .catch(error => {
      console.log(error);
      setAuthing(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ล็อกอินไม่สำเร็จ',
        showConfirmButton: false,
      })
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
                <p className="text sup">รายการการประชุมสำหรับนักศึกษาคณะวิศวกรรมศาสตร์</p>
              </div>
              <form className="login-form">
              <label htmlFor="email">อีเมล</label>
                <input className="text-email" ref={emailRef} placeholder="6510110xxx@psu.ac.th" type="email" id="email" />
              <label htmlFor="pwd">รหัสผ่าน</label>
                <input className="text-pwd" ref={passwordRef} placeholder="รหัสผ่าน" type="password" id="pwd" />
              </form>
              <div className="field">
                  <button className="login-btn" onClick={() => signInByEMailPass()} disabled={authing}>เข้าสู่ระบบ</button>
              </div>
            </div>
        </div>
    </div>
)
}
export default Login;