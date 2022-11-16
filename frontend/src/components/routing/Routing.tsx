import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Userfront from '@userfront/react';

import LayoutsWithNavbar from '../shared/LayoutsWithNavbar';
import { Login, Logout, Signup, Reset } from '../Authentication';

// Landing Page
// import Home from '../../components/LandingPage/Home';

// Clinic
// import ClinicAddProfile from '../../containers/Clinic/ClinicAddProfile';
import ClinicUpdateProfile from '../../containers/Clinic/ClinicUpdateProfile';

// Doctor
// import DoctorAddProfile from '../../containers/Doctor/DoctorAddProfile';
import DoctorUpdateProfile from '../../containers/Doctor/DoctorUpdateProfile';
// import DoctorVideoCall from '../../containers/Doctor/VideoCall';

// Patient
// import PatientAddProfile from '../../containers/Patient/PatientAddProfile';
import PatientUpdateProfile from '../../containers/Patient/PatientUpdateProfile';

// Dashboard
import Dashboard from '../Dashboard/Dashboard';
import PatientProfile from '../Dashboard/Profiles/PatientProfile';

//Video Call
import CreateRoom from '../../containers/VideoCall/CreateRoom';
import Room from '../../containers/VideoCall/Room';
import NotFoundPage from '../NotFoundPage';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

const Routing = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* temporary navbar - will need to refactor later */}
      {/* <Route element={<LayoutsWithNavbar />}> */}
      {/* PUBLIC ROUTES */}
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Need UI improvement */}
      <Route path="*" element={<NotFoundPage />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="video-call"
        element={
          <RequireAuth>
            <CreateRoom />
          </RequireAuth>
        }
      />
      <Route
        path="room/:roomId"
        element={
          <RequireAuth>
            <Room />
          </RequireAuth>
        }
      />
      <Route
        path="/leave-call"
        element={
          <RequireAuth>
            <Navigate to="/" />{' '}
          </RequireAuth>
        }
      />
      {/* <Route
        path="clinic/profile/add"
        element={
          <RequireAuth>
            <ClinicAddProfile />
          </RequireAuth>
        }
      /> */}
      <Route
        path="clinic/profile/update"
        element={
          <RequireAuth>
            <ClinicUpdateProfile />
          </RequireAuth>
        }
      />
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="patient/profile"
        element={
          <RequireAuth>
            <PatientProfile ptName={''} ptImgSrc={''} />
          </RequireAuth>
        }
      />
      {/* <Route
        path="patient/profile/add"
        element={
          <RequireAuth>
            <PatientAddProfile />
          </RequireAuth>
        }
      /> */}
      <Route
        path="patient/profile/update"
        element={
          <RequireAuth>
            <PatientUpdateProfile />
          </RequireAuth>
        }
      />
      {/* <Route
        path="doctor/profile/add"
        element={
          <RequireAuth>
            <DoctorAddProfile />
          </RequireAuth>
        }
      /> */}
      <Route
        path="doctor/profile/update"
        element={
          <RequireAuth>
            <DoctorUpdateProfile />
          </RequireAuth>
        }
      />
      {/* <Route
        path="clinic/profile/add"
        element={
          <RequireAuth>
            <ClinicAddProfile />
          </RequireAuth>
        }
      /> */}
      <Route
        path="clinic/profile/update"
        element={
          <RequireAuth>
            <ClinicUpdateProfile />
          </RequireAuth>
        }
      />
      <Route
        path="reset"
        element={
          <RequireAuth>
            <Reset />
          </RequireAuth>
        }
      />
      <Route
        path="logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      {/* </Route> */}
    </Routes>
  );
};

interface Children {
  children: any;
}

const RequireAuth: React.FC<Children> = ({ children }) => {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default Routing;
