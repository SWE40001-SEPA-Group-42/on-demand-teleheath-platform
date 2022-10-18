import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Userfront from '@userfront/react';

import LayoutsWithNavbar from '../shared/LayoutsWithNavbar';
import { Login, Logout, Signup, Reset } from '../Authentication';

// Landing Page
// import Home from '../../components/LandingPage/Home';

// Clinic
import ClinicAddProfile from '../../containers/Clinic/ClinicAddProfile';
import ClinicUpdateProfile from '../../containers/Clinic/ClinicUpdateProfile';

// Doctor
import DoctorAddProfile from '../../containers/Doctor/DoctorAddProfile';
import DoctorUpdateProfile from '../../containers/Doctor/DoctorUpdateProfile';
import DoctorVideoCall from '../../containers/Doctor/VideoCall';

// Patient
import PatientSignUp from '../Forms/Patient/PatientSignUpForm';
import PatientAddProfile from '../../containers/Patient/PatientAddProfile';
import PatientUpdateProfile from '../../containers/Patient/PatientUpdateProfile';

// Dashboard
import Dashboard from '../Dashboard/Dashboard';
import PatientProfile from '../Dashboard/PatientProfile';

//Video Call
import CreateRoom from '../../containers/VideoCall/CreateRoom';
import Room from '../../containers/VideoCall/Room';

Userfront.init('xbrr9qdb');

const Routing = () => {
	return (
		<Routes>
			{/* temporary navbar - will need to refactor later */}
			<Route element={<LayoutsWithNavbar />}>
				{/* <Route path="/" element={<Home />} /> */}
				<Route index element={<Dashboard />} />
				<Route
					path="patient/profile"
					element={<PatientProfile ptName={''} ptImgSrc={''} />}
				/>
				<Route path="signup/patient" element={<PatientSignUp />} />

				<Route path="patient/profile/add" element={<PatientAddProfile />} />
				<Route
					path="patient/profile/update"
					element={<PatientUpdateProfile />}
				/>

				<Route path="doctor/profile/add" element={<DoctorAddProfile />} />
				<Route path="doctor/profile/update" element={<DoctorUpdateProfile />} />

				<Route path="video-call" element={<CreateRoom />} />
				<Route path="room/:roomId" element={<Room />} />
				<Route path="/leave-call" element={<Navigate to="/" />} />

				<Route path="clinic/profile/add" element={<ClinicAddProfile />} />
				<Route path="clinic/profile/update" element={<ClinicUpdateProfile />} />
				{/* <Route path="dashboard" 
					element=
						{<RequireAuth>
							<Dashboard/>
						</RequireAuth>} />
				<Route path="patient/profile" 
					element=
						{<RequireAuth>
							<PatientProfile ptName={''} ptImgSrc={''} />
						</RequireAuth>
				}/>
				<Route path="signup/patient" 
					element=
						{<RequireAuth>
							<PatientSignUp />
						</RequireAuth>
						} />
				<Route path="patient/profile/add" 
					element=
						{<RequireAuth>
							<PatientAddProfile />
						</RequireAuth>
						} />
				<Route path="patient/profile/update" 
					element=
						{<RequireAuth>
							<PatientUpdateProfile />
						</RequireAuth>
						} />
				<Route path="doctor/profile/add" 
					element=
						{<RequireAuth>
							<DoctorAddProfile/>
						</RequireAuth>
						}/>
				<Route path="doctor/profile/update" 
					element=
						{<RequireAuth>
							<DoctorUpdateProfile />
						</RequireAuth>
						} />
				<Route path="clinic/profile/add" 
					element=
						{<RequireAuth>
							<ClinicAddProfile />
						</RequireAuth>
						} />
				<Route path="clinic/profile/update" 
					element=
						{<RequireAuth>
							<ClinicUpdateProfile />
						</RequireAuth>
						} />
				<Route index element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="reset" element={<Reset />} />
				<Route path="logout" element={<Logout />} /> */}
			</Route>
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
