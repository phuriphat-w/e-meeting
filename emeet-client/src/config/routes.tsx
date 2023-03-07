import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import MeetInfoList from '../pages/meet-info';
import AnnouncementList from '../pages/an-list';
import AuthRoute from './authRoutes';

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