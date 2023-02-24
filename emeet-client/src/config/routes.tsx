import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/login';
import MeetInfoList from '../pages/meet-info';
import AnnouncementList from '../pages/an-list';
import { useAppCtx } from '../AppProvider';
import AuthRoute from './authRoutes';

type Props = {
  staffOnly?: boolean
  children: JSX.Element
}

const ProtectedRoute = ({staffOnly, children }: Props) => {
  const {userInfo, action} = useAppCtx();
  const location = useLocation()
  const staffDenied = staffOnly && !action.isStaff()
  if (!userInfo.ready || staffDenied) {    
    if(staffDenied){
      action.signOut()
    }
    console.log('backTo = ', location.pathname)
    return  <Navigate to="/login" replace state={{backTo: location.pathname}}/>;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login/>} />
      <Route path="announcement" element={<AuthRoute><AnnouncementList/></AuthRoute>} />
      <Route path="home" element={<AuthRoute><MeetInfoList/></AuthRoute>} />
    </Routes>
  );
};

export default AppRoutes;