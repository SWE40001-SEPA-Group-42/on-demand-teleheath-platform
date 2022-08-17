import React from 'react'
import ReactDOM from 'react-dom/client'
import ClinicForm from './components/ClinicForm'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ClinicForm />
	</React.StrictMode>
)
