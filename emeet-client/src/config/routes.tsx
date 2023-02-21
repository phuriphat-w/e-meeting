import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/login';
import MeetInfoList from '../pages/meet-info';
import AnnouncementList from '../pages/an-list';
import { useAppCtx } from '../AppProvider';

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
      <Route path="announcement" element={<ProtectedRoute staffOnly={true}><AnnouncementList/></ProtectedRoute>} />
      <Route path="home" element={<ProtectedRoute><MeetInfoList/></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;