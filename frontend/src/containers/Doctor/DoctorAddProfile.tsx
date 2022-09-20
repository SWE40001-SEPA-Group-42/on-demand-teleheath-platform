import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Heading,
	SimpleGrid,
	useToast,
} from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';
import LanguagesSpokenField from '../../components/CustomFormFields/LanguagesSpokenField';
import DoctorDAO from '../../DAOs/DoctorDAO';
import DoctorDTO from '../../DTOs/DoctorDTO';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface FormModel {
	drUsername: string;
	drPassword: string;
	drDateCreated: string;
	drGivenName: string;
	drSurname: string;
	drDOB: string;
	drBirthSex: string;
	drPreferredName?: string;
	drEmail: string;
	drPhone: string;
	drAddress: {
		line1: string;
		line2?: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
	drCode: string;
	drPrescribeCode: string;
	drClinicName: string;
	drQualif: string;
	drLanguages: [string];
}

const DoctorAddProfile = () => {
	const currentDate = new Date();
	const toast = useToast();

	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)

	return (
		<Formik
			initialValues={{
				drGivenName: '',
				drSurname: '',
				drPreferredName: '',
				drDOB: '',
				drBirthSex: '',
				drEmail: '',
				drPhone: '',
				drAddress: '',
				line1: '',
				line2: '',
				city: '',
				state: '',
				postcode: '',
				country: '',
				drCode: '',
				drPrescribeCode: '',
				drQualifications: '',
				drLanguages: [''],
				drClinicName: '',
				drDateCreated: currentDate.toISOString(),
			}}
			validationSchema={Yup.object({
				drGivenName: Yup.string()
					.required('Given name(s) cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				drSurname: Yup.string()
					.required('Surname cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				drPreferredName: Yup.string().matches(
					/^[A-Za-z]+$/,
					'Only alphabets are allowed for this field'
				),
				drEmail: Yup.string()
					.required('Email cannot be blank')
					.email('Please enter valid email address'),
				drPhone: Yup.string().required('Phone number cannot be blank'),
				drAddress: Yup.object({
					line1: Yup.string()
						.required('Address Line 1 cannot be blank')
						.matches(/^[ A-Za-z0-9_./#&-]*$/, 'Please enter a valid street address'),
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
				drPrescribeCode: Yup.string().required(
					'Prescriber Code cannot be blank'
				),
				drClinicName: Yup.string()
					.required('Clinic cannot be blank'),
				drQualifications: Yup.string()
					.required('Qualifications cannot be blank'),
			})}
			onSubmit={(values, actions) => {
				console.log("")
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg" py={4}>Practioner's details</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="drSurName"
								type="text"
								label="Surname"
								placeholder="Surname"
							/>
						</SimpleGrid>
						<InputField
							name="drPreferredName"
							type="text"
							label="Preferred name"
							placeholder="Preferred name (optional)"
						/>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drDOB"
								type="date"
								label="Date of birth (dd/mm/yyyy)"
							/>
							<BirthSexField name="drBirthSex" label="Birth sex" />
						</SimpleGrid>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>Contact details</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drEmail"
								type="email"
								label="Email adress"
								placeholder="Email address"
							/>
							<InputField
								name="drPhone"
								type="text"
								label="Phone number"
								placeholder="Phone number"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drAddress.city"
								type="text"
								label="City"
								placeholder="City"
							/>
							<InputField
								name="drAddress.state"
								type="text"
								label="State"
								placeholder="State"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
							/>
							<InputField
								name="drAddress.country"
								type="text"
								label="Country"
								placeholder="Country"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 1]} spacing={[0, 5]}>
							<InputField
								name="drPrescribeCode"
								type="text"
								label="Prescriber Code"
								placeholder="Prescriber code"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="drClinicName"
								type="text"
								label="Clinic name"
								placeholder="Clinic name"
							/>
							<InputField
								name="drQualif"
								type="text"
								label="Qualifications"
								placeholder="Qualifications"
							/>
						</SimpleGrid>
						<LanguagesSpokenField name="drLanguages" label="Languages spoken" />
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

export default DoctorAddProfile;
