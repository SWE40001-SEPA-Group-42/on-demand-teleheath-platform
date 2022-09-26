import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicForm from '../Clinic/ClinicForm';
import DoctorForm from '../Doctor/DoctorForm';
import PatientSignUp from '../Patient/PatientSignUp';
import PatientAddProfile from '../Patient/PatientAddProfile';
import { Login, Logout, Signup, Reset } from '../Authentication';
import Dashboard from '../Dashboard/Dashboard';

const Routing = () => {
	return (
		<Routes>
			<Route index element={<PatientSignUp />} />
			<Route path="patient/profile/add" element={<PatientAddProfile />} />
			<Route path="doctor/add" element={<DoctorForm />} />
			<Route path="clinic/add" element={<ClinicForm />} />
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
			<Route path="reset" element={<Reset />} />
			<Route path="logout" element={<Logout />} />
			<Route index element={<Dashboard />} />
		</Routes>
	);
};

export default Routing;