import { useState, useEffect } from "react";
import { useAppCtx } from "../AppProvider";
import { useNavigate, Link } from "react-router-dom";
import "./app-bar.css";
import Icon from '../images/psu-icon.png';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';

function MeetAppBar() {
  const { userInfo, action } = useAppCtx()
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) =>  {
        if (user) {
          setLoading(false);
          const email = user.email;
        }else{
        }
      });

        return () => {
          listen();
        }
    }, []);

      const handleSignOut = () => {
        signOut(auth).then(() => {
          navigate("/");
          console.log("Signed out successfully")
        }).catch((error) => {
          console.log(error);
        });
      };

      const getLink = () => {
        return user?.email === "6510110060@psu.ac.th" ? "/announcement" : "/home";
      };
      
      const getMenu = () => {
        return user?.email === "6510110060@psu.ac.th" ? "นัดหมายการประชุม" : "รายการการประชุม";
      };
    

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src={Icon} alt='"psu-icon' className="psu-icon"/>
          <h2 className="title">E-Meeting</h2>
        </div>
      </div>
      <ul className="contents">
        <li>
          <a href={getLink()}>
            <GroupsIcon sx={{color:'#707070',ml:1.5}}/>
            <span className="menu-text">{getMenu()}</span>
          </a>
        </li>
        <li>
          <a href="#">
            <NotificationImportantIcon sx={{color:'#707070',ml:1}}/>
            <span className="menu-text">แจ้งเตือนการประชุม</span>
          </a>
        </li>
        <li>
          <a href="#">
            <RecentActorsIcon sx={{color:'#707070',ml:1.5}}/>
            <span className="menu-text">รายชื่อสมาชิก</span>
          </a>
        </li>
      </ul>
      <div className="user-info-container">
        <div className="user-info">
        <AccountBoxIcon sx={{fontSize:36,color:'#143b6c'}}/>
        {loading ? (
            <div className="user-info-text">Loading...</div>
          ) : (
            <div className="user-info-text">
              <h1>{user?.email}</h1>
              {/* <p>{role}</p> */}
            </div>
          )}
        <LogoutIcon sx={{cursor:'pointer',ml:2,fontSize:28,color:'#143b6c','&:hover':{color:'red'}}} onClick={handleSignOut}/>
        </div>
      </div>
    </div>
  )}
    

export default MeetAppBar;