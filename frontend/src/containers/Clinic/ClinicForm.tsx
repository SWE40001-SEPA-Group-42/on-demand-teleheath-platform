// import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';

interface FormValues {
	clUsername: string;
	clPassword: string;
	clName: string;
	clEmail: string;
	clPhone: string;
	clAddress: {
		line1: string,
		line2?: string,
		city: string,
		state: string,
		postcode: string,
		country: string,
	};
	clUrl?: string;
}

const ClinicForm = () => {
	// const [isSubmit, setIsSubmit] = useState(false)
	// const [errors, setErrors] = useState({})
	// const [values, setValues] = useState({
	// 	clinicStreetAddress: '',
	// 	clinicSuburb: '',
	// 	clinicState: '',
	// 	clinicPostcode: '',
	// 	clinicContactNumber: '',
	// 	clinicName: '',
	// 	clinicURL: '',
	// })

	// const inputs = [
	// 	{
	// 		id: 1,
	// 		name: 'clinicStreetAddress',
	// 		type: 'text',
	// 		label: 'Street Address',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'clinicSuburb',
	// 		type: 'text',
	// 		label: 'Suburb',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'clinicState',
	// 		type: 'text',
	// 		label: 'State',
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'clinicPostcode',
	// 		type: 'text',
	// 		label: 'Postcode',
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'clinicContactNumber',
	// 		type: 'text',
	// 		label: 'Clinic Contact Number',
	// 	},
	// 	{
	// 		id: 6,
	// 		name: 'clinicName',
	// 		type: 'text',
	// 		label: 'Clinic Name',
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'clinicURL',
	// 		type: 'text',
	// 		label: 'Clinic URL',
	// 	},
	// ]

	// const validate = values => {
	// 	const errors = {}
	// 	const contactRegex = `/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im`
	// 	const URLRegex = `[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`
	// 	if (!values.clinicStreetAddress) {
	// 		errors.clinicStreetAddress = 'Clinic Address is required'
	// 	}
	// 	if (!values.clinicSuburb) {
	// 		errors.clinicSuburb = 'Clinic Address is required'
	// 	}
	// 	if (!values.clinicState) {
	// 		errors.clinicState = 'Clinic Address is required'
	// 	}
	// 	if (!values.clinicPostcode) {
	// 		errors.clinicPostcode = 'Clinic Address is required'
	// 	} else if (!`/^\d+$/`.test(values.clinicPostcode)) {
	// 		errors.clinicPostcode = 'This is not a valid postcode'
	// 	} else if (values.clinicPostcode.length > 4) {
	// 		errors.clinicPostcode = 'This is not a valid postcode'
	// 	}
	// 	if (!values.clinicContactNumber) {
	// 		errors.clinicContactNumber = 'Clinic Contact Number is required'
	// 	} else if (!contactRegex.test(values.clinicContactNumber)) {
	// 		errors.clinicContactNumber = 'This is not a valid phone number'
	// 	}
	// 	if (!values.clinicName) {
	// 		errors.clinicName = 'Clinic Name is required'
	// 	}
	// 	if (!values.clinicURL) {
	// 		errors.clinicURL = 'ClinicURL is required'
	// 	} else if (!URLRegex.test(values.clinicURL)) {
	// 		errors.clinicURL = 'This is not a valid URL'
	// 	}
	// 	return errors
	// }

	// const onChange = e => {
	// 	setValues({ ...values, [e.target.name]: e.target.value })
	// }

	// const handleSubmit = e => {
	// 	e.preventDefault()
	// 	setErrors(validate(values))
	// 	setIsSubmit(true)
	// }

	// useEffect(() => {
	// 	if (Object.keys(errors).length === 0 && isSubmit) {
	// 		console.log(values)
	// 	}
	// }, [errors])
	const currentDate = new Date();

	return (
		<Formik
			initialValues={{
				clDateCreated: currentDate.toISOString(),
				clName: '',
				clEmail: '',
				clAddress: {
					line1: '',
					line2: '',
					city: '',
					state: '',
					postcode: '',
					country: '',
				},
				clUrl: '',
			}}
			validationSchema={Yup.object({
				clName: Yup.string()
					.required('Clinic name is required')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				clEmail: Yup.string()
					.required('Email address cannot be blank')
					.email('Please enter valid email address'),
				clPhone: Yup.string()
					.required('Phone number is required')
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						'Please enter a valid phone number'
					),
				clAddress: Yup.object({
					line1: Yup.string()
						.required('Address Line 1 cannot be blank')
						.matches(
							/^[ A-Za-z0-9_./#&-]*$/,
							'Please enter a valid street address'
						),
					line2: Yup.string().matches(
						/^[ A-Za-z0-9_./#&-]*$/,
						'Please enter a valid address'
					),
					city: Yup.string()
						.required('City cannot be blank')
						.matches(
							/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
							'Only alphabets are allowed for this field'
						),
					state: Yup.string()
						.required('State cannot be blank')
						.matches(
							/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
							'Please enter a valid state'
						),
					postcode: Yup.string()
						.required('Postcode cannot be blank')
						.matches(/^[A-Za-z0-9]+$/, 'Please enter a valid postcode'),
					country: Yup.string()
						.required('Country cannot be blank')
						.matches(
							/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
							'Please enter a valid country'
						),
				}),
				clUrl: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
				'Enter correct url!'),
			})}
			onSubmit={(values) => {
				alert(JSON.stringify(values));
				// console.log(JSON.stringify(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg" py={4}>
							Clinic's details
						</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<InputField
							name="clName"
							type="text"
							label="Clinic name"
							placeholder="Clinic name"
						/>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="clEmail"
								type="email"
								label="Email address"
								placeholder="Email address"
							/>
							<InputField
								name="clPhone"
								type="text"
								label="Phone number"
								placeholder="Phone number"
							/>
						</SimpleGrid>
						<InputField
							name="clUrl"
							type="text"
							label="Website"
							placeholder="Website"
						/>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="clAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="clAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="clAddress.city"
								type="text"
								label="City"
								placeholder="City"
							/>
							<InputField
								name="clAddress.state"
								type="text"
								label="State"
								placeholder="State"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="clAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
							/>
							<InputField
								name="clAddress.country"
								type="text"
								label="Country"
								placeholder="Country"
							/>
						</SimpleGrid>
						<Button
							type="submit"
							colorScheme="blue"
							variant="solid"
							w="100%"
							my={5}
						>
							Add clinic
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default ClinicForm;
