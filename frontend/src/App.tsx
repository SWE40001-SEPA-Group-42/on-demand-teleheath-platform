import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientSignupForm from './containers/Patient/PatientSignupForm';
import PatientDetailsForm from './containers/Patient/PatientDetailsForm';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routes>
						<Route index element={<PatientSignupForm />} />
						<Route
							path="patient/profile/add"
							element={<PatientDetailsForm />}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
