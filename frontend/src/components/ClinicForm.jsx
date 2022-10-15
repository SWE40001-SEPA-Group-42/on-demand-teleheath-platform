import { useState } from 'react'
import { useEffect } from 'react'
import FormInput from './Shared/FormInput'

function ClinicForm() {
	const [isSubmit, setIsSubmit] = useState(false)
	const [errors, setErrors] = useState({})
	const [values, setValues] = useState({
		clinicStreetAddress: '',
		clinicSuburb: '',
		clinicState: '',
		clinicPostcode: '',
		clinicContactNumber: '',
		clinicName: '',
		clinicURL: '',
	})

	const inputs = [
		{
			id: 1,
			name: 'clinicStreetAddress',
			type: 'text',
			label: 'Street Address',
		},
		{
			id: 2,
			name: 'clinicSuburb',
			type: 'text',
			label: 'Suburb',
		},
		{
			id: 3,
			name: 'clinicState',
			type: 'text',
			label: 'State',
		},
		{
			id: 4,
			name: 'clinicPostcode',
			type: 'text',
			label: 'Postcode',
		},
		{
			id: 5,
			name: 'clinicContactNumber',
			type: 'text',
			label: 'Clinic Contact Number',
		},
		{
			id: 6,
			name: 'clinicName',
			type: 'text',
			label: 'Clinic Name',
		},
		{
			id: 7,
			name: 'clinicURL',
			type: 'text',
			label: 'Clinic URL',
		},
	]

	const validate = values => {
		const errors = {}
		const contactRegex = `/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im`
		const URLRegex = `[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`
		if (!values.clinicStreetAddress) {
			errors.clinicStreetAddress = 'Clinic Address is required'
		}
		if (!values.clinicSuburb) {
			errors.clinicSuburb = 'Clinic Address is required'
		}
		if (!values.clinicState) {
			errors.clinicState = 'Clinic Address is required'
		}
		if (!values.clinicPostcode) {
			errors.clinicPostcode = 'Clinic Address is required'
		} else if (!`/^\d+$/`.test(values.clinicPostcode)) {
			errors.clinicPostcode = 'This is not a valid postcode'
		} else if (values.clinicPostcode.length > 4) {
			errors.clinicPostcode = 'This is not a valid postcode'
		}
		if (!values.clinicContactNumber) {
			errors.clinicContactNumber = 'Clinic Contact Number is required'
		} else if (!contactRegex.test(values.clinicContactNumber)) {
			errors.clinicContactNumber = 'This is not a valid phone number'
		}
		if (!values.clinicName) {
			errors.clinicName = 'Clinic Name is required'
		}
		if (!values.clinicURL) {
			errors.clinicURL = 'ClinicURL is required'
		} else if (!URLRegex.test(values.clinicURL)) {
			errors.clinicURL = 'This is not a valid URL'
		}
		return errors
	}

	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		setErrors(validate(values))
		setIsSubmit(true)
	}

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmit) {
			console.log(values)
		}
	}, [errors])
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Add a new clinic</h2>
				{inputs.map(input => (
					<FormInput
						key={input.id}
						{...input}
						value={values[input.name]}
						onChange={onChange}
						error={errors[input.name]}
					/>
				))}
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default ClinicForm
