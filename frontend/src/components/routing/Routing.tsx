import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicAddProfile from '../Clinic/ClinicAddProfile';
import ClinicUpdateProfile from '../Clinic/ClinicUpdateProfile';
import DoctorAddProfile from '../../containers/Doctor/DoctorAddProfile'
import PatientSignUp from '../Patient/PatientSignUp';
import PatientAddProfile from '../Patient/PatientAddProfile';
import PatientUpdateProfile from '../Patient/PatientUpdateProfile';
import { Login, Logout, Signup, Reset } from '../Authentication';
import LayoutsWithNavbar from '../Shared/LayoutsWithNavbar';
import Dashboard from '../Dashboard/Dashboard';
import PatientProfile from '../Dashboard/PatientProfile';
import DoctorDetails from '../../containers/Doctor/DoctorDetails';
  
const Routing = () => {
	return (
		<Routes>
			{/* temporary navbar */}
			<Route element={<LayoutsWithNavbar />} >
				<Route index element={<Dashboard />} />
				<Route path="patient/profile" element={<PatientProfile ptName={''} ptImgSrc={''} />} />
				<Route path="signup/patient" element={<PatientSignUp />} />
				
				<Route path="patient/profile/add" element={<PatientAddProfile />} />
				<Route path="patient/profile/" element={<PatientUpdateProfile />} />
				
				<Route path="doctor/profile/add" element={<DoctorAddProfile />} />
				<Route path="doctor/profile/" element={<DoctorDetails/>} />
				
				<Route path="clinic/profile/add" element={<ClinicAddProfile />} />
				<Route path="clinic/profile/update" element={<ClinicUpdateProfile />} />
				
				{/* Authorization and Authentication */}
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="reset" element={<Reset />} />
				<Route path="logout" element={<Logout />} />
			</Route>
		</Routes>
	);
};

export default Routing;