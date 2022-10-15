import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routing from './components/Routing/Routing';


//For testing only
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { fetchDoctors } from './redux/Doctor/doctorsSlice';


function App() {
	// const dispatch = useAppDispatch()
	// const doctors = useAppSelector(state => state.doctors)
	// if (doctors.data.length == 0) {
	// 	dispatch(fetchDoctors())
	// }
	// console.log(doctors)

	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routing/>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
