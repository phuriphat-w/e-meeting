import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./app-bar.css";
import Icon from '../images/psu-icon.png';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useMockAuth } from './MockAuth';
import Notifications from "./notification/notification";

function MeetAppBar() {
  const navigate = useNavigate();
  const { currentUser: user, signOut } = useMockAuth();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

      const handleSignOut = () => {
        signOut().then(() => {
          navigate("/");
          console.log("Signed out successfully")
        }).catch((error) => {
          console.log(error);
        });
      };

      const Admin = "6510110060@psu.ac.th";

      const getLinkAdmin = () => {
        return user?.email === Admin ? "/announcement" : "/home";
      };
      
      const getLink = () => {
        return "/home" ;
      };

      const getMenuAdmin = () => {
          return "นัดหมายการประชุม"

      };

      const getMenu = () => {
        return "รายการการประชุม"
      };
      const role = () => {
        return user?.email === Admin ? "Admin" : "User";
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
            <GroupsIcon sx={{color:'#ECF9FF',ml:1.5}}/>
            <span className="menu-text">{getMenu()}</span>
          </a>
        </li>
        {user?.email === Admin &&
        <li>
          <a href={getLinkAdmin()}>
            <GroupsIcon sx={{color:'#ECF9FF',ml:1.5}}/>
            <span className="menu-text">{getMenuAdmin()}</span>
          </a>
        </li>}
        <li>
          <a>
            <Notifications/>
          </a>
        </li>
      </ul>
      <ul className="logout-btn">
        <li onClick={handleSignOut}>
          <a>
            <LogoutIcon sx={{color:'#ECF9FF',ml:1.5}}/>
            <span className="menu-text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  )}
    

export default MeetAppBar;