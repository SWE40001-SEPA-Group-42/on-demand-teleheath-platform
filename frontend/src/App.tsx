import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClinicForm from './containers/Clinic/ClinicForm';

//Doctor
import DoctorSignupForm from './containers/Doctor/DoctorSignupForm';
import DoctorDetailsForm from './containers/Doctor/DoctorDetailsForm';
import AddDoctorDetailsForm from './containers/Doctor/AddDoctorDetailsForm';

//Patient
import PatientSignupForm from './containers/Patient/PatientSignupForm';
import AddPatientDetails from './containers/Patient/AddPatientDetails';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routes>
						<Route index element={<PatientSignupForm />} />
						{/* Patient */}
						<Route
							path="patient/profile/add"
							element={<AddPatientDetails />}
						/>
						{/* Doctor */}
						<Route 
							path="doctor/signup" 
							element={<DoctorSignupForm />} 
						/>
						<Route 
							path="doctor/profile" 
							element={<DoctorDetailsForm />} 
						/>
						<Route 
							path="doctor/profile/add" 
							element={<AddDoctorDetailsForm />} 
						/>
						{/* Clinic */}
						<Route path="clinic/add" element={<ClinicForm />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
