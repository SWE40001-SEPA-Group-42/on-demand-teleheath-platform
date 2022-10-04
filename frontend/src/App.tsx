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
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
