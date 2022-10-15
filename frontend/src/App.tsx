<<<<<<< HEAD
import React from 'react';
import '../src/styles/app.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './components/routing/Routing';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<main>
					<Routing />
=======
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
>>>>>>> created UI components for WebRTC
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
