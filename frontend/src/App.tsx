import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClinicForm from './containers/Clinic/ClinicForm';

//Doctor
import DoctorAddProfile from './containers/Doctor/DoctorAddProfile';
import DoctorDetailsForm from './containers/Doctor/DoctorDetailsForm';
import AddDoctorDetailsForm from './containers/Doctor/AddDoctorDetailsForm';

//Patient
import PatientSignupForm from './containers/Patient/PatientSignupForm';
import AddPatientDetails from './containers/Patient/AddPatientDetails';

//For testing only
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { fetchDoctors } from './redux/Doctor/doctorsSlice';


function App() {
	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)
	if (doctors.data.length == 0) {
		dispatch(fetchDoctors())
	}
	console.log(doctors)

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
							path="clinic/doctor/add" 
							element={<DoctorAddProfile />} 
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
