import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import NewPatient from './containers/Patient/NewPatient';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route index element={<NewPatient />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
