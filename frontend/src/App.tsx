import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClinicForm from './components/Clinic/ClinicForm';
import DoctorForm from './components/Doctor/DoctorForm';
import PatientSignUp from './components/Patient/PatientSignUp';
import PatientAddProfile from './components/Patient/PatientAddProfile';
import { Login, Logout, Signup, Reset } from './components/Authentication'
import DashboardTable from './components/Dashboard/Table/DashboardTable';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routes>
						<Route index element={<PatientSignUp />} />
						<Route
							path="patient/profile/add"
							element={<PatientAddProfile />}
						/>
						<Route path="doctor/add" element={<DoctorForm />} />
						<Route path="clinic/add" element={<ClinicForm />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<Signup />} />
						<Route path="reset" element={<Reset />} />
						<Route path="logout" element={<Logout />} />
						<Route index element={<DashboardTable />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
