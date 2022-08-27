import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClinicForm from './containers/Clinic/ClinicForm';
import DoctorForm from './containers/Doctor/DoctorForm';
import PatientSignupForm from './containers/Patient/PatientSignupForm';
import AddPatientDetails from './containers/Patient/AddPatientDetails';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routes>
						<Route index element={<PatientSignupForm />} />
						<Route
							path="patient/profile/add"
							element={<AddPatientDetails />}
						/>
						<Route path="doctor/add" element={<DoctorForm />} />
						<Route path="clinic/add" element={<ClinicForm />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
