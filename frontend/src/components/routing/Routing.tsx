import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicAddProfile from '../Clinic/ClinicAddProfile';
import DoctorAddProfile from '../Doctor/DoctorAddProfile';
import PatientSignUp from '../Patient/PatientSignUp';
import PatientAddProfile from '../Patient/PatientAddProfile';
import { Login, Logout, Signup, Reset } from '../Authentication';
import Dashboard from '../Dashboard/Dashboard';

const Routing = () => {
	return (
		<Routes>
			<Route index element={<PatientSignUp />} />
			<Route path="patient/profile/add" element={<PatientAddProfile />} />
			<Route path="doctor/profile/add" element={<DoctorAddProfile />} />
			<Route path="clinic/profile/add" element={<ClinicAddProfile />} />
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
			<Route path="reset" element={<Reset />} />
			<Route path="logout" element={<Logout />} />
			<Route index element={<Dashboard />} />
		</Routes>
	);
};

export default Routing;