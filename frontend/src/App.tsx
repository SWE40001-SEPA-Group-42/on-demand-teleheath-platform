import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './components/routing/Routing';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<main>
					<Routing />
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
