import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../CustomFormFields/InputField';
import BirthSexField from '../CustomFormFields/BirthSexField';
import BirthSexSelectField from '../CustomFormFields/BirthSexSelectField';
import LanguagesSpokenField from '../CustomFormFields/LanguagesSpokenField';
import LanguagesSpokenSelectField from '../CustomFormFields/LanguagesSpokenSelectField';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addDoctor } from '../../redux/Doctor/doctorsSlice';

interface IDoctorAddProfile {
}

const DoctorAddProfileForm: React.FC<IDoctorAddProfile> = () => {
	const currentDate = new Date().toISOString();
	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)
	const birthSexOptions = ['Male', 'Female', 'Other'];
	const languagesSpokenOptions = [
		'english',
		'mandarin',
		'vietnamese',
		'hindi',
		'cantonese',
		'greek',
		'other',
	];

	const initialValues = {
		drGivenName: "",
		drSurname: "",
		drPreferredName: "",
		drDOB: "",
		drBirthSex: "",
		drEmail: "",
		drPhone: "",
		drAddress: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postcode: "",
			country: ""
		},
		drCode: "",
		drPrescriberNo: "",
		drQualifications: "",
		drLanguagesSpoken: "",
		drClinicName: ""
	};

	const validationSchema = Yup.object().shape({
		drGivenName: Yup.string()
			.required('Given name(s) cannot be blank')
			.matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
		drSurname: Yup.string()
			.required('Surname cannot be blank')
			.matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
		drPreferredName: Yup.string().matches(
			/^[A-Za-z ]+$/,
			'Only alphabets are allowed for this field'
		),
		drDOB: Yup.string()
			.required('Date of Birth cannot be blank')
			.matches(
				/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
				'Please enter a valid date in the format: YYYY-MM-DD'
			),
		drBirthSex: Yup.string()
			.required('Please select your birth sex')
			.oneOf(birthSexOptions),
		drEmail: Yup.string()
			.required('Email cannot be blank')
			.email('Please enter valid email address'),
		drPhone: Yup.string().required('Phone number cannot be blank'),
		drAddress: Yup.object({
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
		drCode: Yup.string().required("Doctor's code cannot be blank"),
		drPrescriberNo: Yup.string().required(
			'Prescriber Code cannot be blank'
		),
		drClinicName: Yup.string()
			.required('Clinic cannot be blank')
			.matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
		drQualifications: Yup.string()
			.required('Qualifications cannot be blank')
			.matches(/^[A-Za-z ]+$/, 'Only alphabets are allowed for this field'),
		drLanguagesSpoken: Yup.string()
			.required('Please select languages spoken')
			.oneOf(languagesSpokenOptions),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, actions) => {
				actions.setSubmitting(false);
				console.log(values)	
				dispatch(addDoctor(values))
				if (doctors.error == '') {
					alert("Add doctor profile successfully!");
					// window.location.reload()
				}
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg" py={4}>
							Doctor's details
						</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<InputField
							name="drPreferredName"
							type="text"
							label="Preferred name"
							placeholder="Preferred name (optional)"
							onChange={formik.handleChange}
						/>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drDOB"
								type="date"
								label="Date of birth (dd/mm/yyyy)"
								onChange={formik.handleChange}
							/>
							<BirthSexField name="drBirthSex" label="Birth sex" onChange={formik.handleChange}>
								<BirthSexSelectField />
							</BirthSexField>
						</SimpleGrid>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								Contact details
							</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drEmail"
								type="email"
								label="Email adress"
								placeholder="Email address"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drPhone"
								type="text"
								label="Phone number"
								placeholder="Phone number"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line1"
								type="text"
								label="Address Line 1"
								onChange={formik.handleChange}
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line2"
								type="text"
								label="Address Line 2"
								onChange={formik.handleChange}
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drAddress.city"
								type="text"
								label="City"
								placeholder="City"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drAddress.state"
								type="text"
								label="State"
								placeholder="State"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drAddress.country"
								type="text"
								label="Country"
								placeholder="Country"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drCode"
								type="text"
								label="Practioner's code"
								placeholder="Practioner's code"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drPrescriberNo"
								type="text"
								label="Prescriber Code"
								placeholder="Prescriber code"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drClinicName"
								type="text"
								label="Clinic name"
								placeholder="Clinic name"
								onChange={formik.handleChange}
							/>
							<InputField
								name="drQualifications"
								type="text"
								label="Qualifications"
								placeholder="Qualifications"
								onChange={formik.handleChange}
							/>
						</SimpleGrid>
						<LanguagesSpokenField 
							name="drLanguagesSpoken" 
							label="Languages spoken" 
							onChange={formik.handleChange}
						>
							<LanguagesSpokenSelectField />
						</LanguagesSpokenField>
						<Button
							type="submit"
							colorScheme="blue"
							variant="solid"
							w="100%"
							my={5}
						>
							Add doctor
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default DoctorAddProfileForm;