import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClinicForm from './containers/Clinic/ClinicForm';
import DoctorForm from './containers/Doctor/DoctorForm';
import PatientSignUp from './containers/Patient/PatientSignUp';
import PatientAddProfile from './containers/Patient/PatientAddProfile';
import { Login, Logout, Signup, Reset } from './components/Authentication'

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
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
