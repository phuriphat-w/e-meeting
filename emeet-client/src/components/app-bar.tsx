import { useState, useEffect, ChangeEvent } from "react";
import { useAppCtx } from "../AppProvider";
import { useNavigate } from "react-router-dom";
import "./app-bar.css";
import Icon from '../images/psu-icon.png';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { getAuth, signOut } from 'firebase/auth';

function MeetAppBar() {
  const { userInfo, action } = useAppCtx()
  const navigate = useNavigate();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error);
    });
  };

  const getLink = () => {
    if (userInfo.staff) {
      return '/announcement';
    } else {
      return '/home';
    }
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
            <span className="menu-text">นัดหมายการประชุม</span>
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
        <div className="user-info-text">
          <h1>{userInfo.displayName}</h1>
          {/* <p>{role}</p> */}
        </div>
        <LogoutIcon sx={{cursor:'pointer',ml:2,fontSize:28,color:'#143b6c','&:hover':{color:'red'}}} onClick={handleSignOut}/>
        </div>
      </div>
    </div>
  )}
    

export default MeetAppBar;