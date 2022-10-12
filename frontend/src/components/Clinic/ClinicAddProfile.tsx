// import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../CustomFormFields/InputField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addClinic } from '../../redux/Clinic/clinicsSlice';

interface IClinicAddProfile {}

const ClinicAddProfile: React.FC<IClinicAddProfile> = () => {
	const dispatch = useAppDispatch()
	const clinics = useAppSelector(state => state.clinics)
	const initialValue = {
		clName: "",
		clAddress: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postcode: "",
			country: ""
		},
		clPhone: "",
		clEmailAddress: ""
	}

	const validationSchema = Yup.object({
		clName: Yup.string()
			.required('Clinic name is required')
			.matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
		clEmailAddress: Yup.string()
			.required('Email address cannot be blank')
			.email('Please enter valid email address'),
		clPhone: Yup.string().required('Phone number cannot be blank'),
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
		})
	})

	return (
		<Formik
			initialValues={initialValue}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
				dispatch(addClinic(values))
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
								Clinic's Details
							</Heading>
							<hr />
						</Box>
						<InputField
							name="clName"
							type="text"
							label="Clinic name"
							placeholder="Clinic name"
							onChange={formik.handleChange}
						/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="clEmailAddress"
								type="email"
								label="Email address"
								placeholder="Email address"
								onChange={formik.handleChange}
							/>
							<InputField
								name="clPhone"
								type="text"
								label="Phone number"
								placeholder="Phone number"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
							<InputField
								name="clAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
								onChange={formik.handleChange}
							/>
							<InputField
								name="clAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
								onChange={formik.handleChange}
							/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="clAddress.city"
								type="text"
								label="City"
								placeholder="City"
								onChange={formik.handleChange}
							/>
							<InputField
								name="clAddress.state"
								type="text"
								label="State"
								placeholder="State"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="clAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
								onChange={formik.handleChange}
							/>
							<InputField
								name="clAddress.country"
								type="text"
								label="Country"
								placeholder="Country"
								onChange={formik.handleChange}
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

export default ClinicAddProfile;
