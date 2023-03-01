import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./app-bar.css";
import Icon from '../images/psu-icon.png';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import Notifications from "./notification/notification";

function MeetAppBar() {
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

      const role = () => {
        return user?.email === "6510110060@psu.ac.th" ? "Admin" : "";
      }
    

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src={Icon} alt='"psu-icon' className="psu-icon"/>
          <h2 className="title">E-Meeting</h2>
        </div>
      </div>
      <div className="user-info-container">
          <div className="user-info">
          <AccountBoxIcon sx={{fontSize:36,color:'#143b6c'}}/>
          {loading ? (
              <div className="user-info-text">Loading...</div>
            ) : (
              <div className="user-info-text">
              <h1>{user?.email?.substring(0, user?.email?.indexOf("@"))}</h1>
              <p>{role()}</p>
            </div>
          )}
        </div>
      </div>
      <ul className="contents">
        <li>
          <a href={getLink()}>
            <GroupsIcon sx={{color:'#707070',ml:1.5}}/>
            <span className="menu-text">{getMenu()}</span>
          </a>
        </li>
          <Notifications />
        <li>
          <a href="#">
            <RecentActorsIcon sx={{color:'#707070',ml:1.5}}/>
            <span className="menu-text">รายชื่อสมาชิก</span>
          </a>
        </li>
      </ul>
      <ul className="logout-btn">
        <li onClick={handleSignOut}>
          <a>
            <LogoutIcon sx={{color:'#707070',ml:1.5}}/>
            <span className="menu-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  )}
    

export default MeetAppBar;