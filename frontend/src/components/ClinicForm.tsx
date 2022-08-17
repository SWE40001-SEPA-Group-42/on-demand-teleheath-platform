import { useState } from 'react'

function ClinicForm() {
	const [name, setName] = useState('')
	const [location, setLocation] = useState('')
	const [contact, setContact] = useState('')

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		const newClinic = {
			name,
			location,
			contact,
		}
		// push to backend
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Add a new clinic</h2>
				<div className='input-group'>
					<label htmlFor='clinicName'>Clinic Name</label>
					<input id='clinicName' onChange={handleTextChange} type='text' value={name} />
				</div>
				<div className='input-group'>
					<label htmlFor='clinicLocation'>Clinic Location</label>
					<input id='clinicLocation' onChange={handleTextChange} type='text' value={location} />
				</div>
				<div className='input-group'>
					<label htmlFor='clinicContact'>Clinic Contact</label>
					<input id='clinicContact' onChange={handleTextChange} type='text' value={contact} />
				</div>
				<div>
					<button type='submit'>Send</button>
				</div>
			</form>
		</div>
	)
}

export default ClinicForm
