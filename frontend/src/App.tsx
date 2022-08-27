import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorForm from './containers/Doctor/DoctorForm';
import PatientSignUp from './containers/Patient/PatientSignUp';
import PatientAddProfile from './containers/Patient/PatientAddProfile';

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
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
