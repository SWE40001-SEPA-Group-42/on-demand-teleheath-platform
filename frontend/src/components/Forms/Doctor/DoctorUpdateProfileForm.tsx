import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../../CustomFormFields/InputField';
import BirthSexField from '../../CustomFormFields/BirthSexField';
import BirthSexSelectField from '../../CustomFormFields/BirthSexSelectField';
import LanguagesSpokenField from '../../CustomFormFields/LanguagesSpokenField';
import LanguagesSpokenSelectField from '../../CustomFormFields/LanguagesSpokenSelectField';

import { EditIcon } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { modifyDoctorById } from '../../../redux/Doctor/doctorsSlice';
import Userfront from '@userfront/react';

import { Doctor } from '../../../types/Doctor';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);


interface IDoctorUpdateProfile {
	drDoctor: Doctor;
}

const DoctorUpdateProfileForm = ({ drDoctor }: IDoctorUpdateProfile) => {
	const doctor = drDoctor;
	const dispatch = useAppDispatch();
	const doctors = useAppSelector((state) => state.doctors);
	const birthSexOptions = ['Male', 'Female', 'Other'];
	const languagesSpokenOptions = [
		'English',
		'Mandarin',
		'Vietnamese',
		'Hindi',
		'Cantonese',
		'Greek',
		'Other',
	];

	const initialValues = {
		...doctor,
		drDOB: doctor.drDOB.substring(0, 10),
	};

	// console.log('Form', doctor)

	const [edited, setEdited] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);

	const toggleEdit = () => {
		setEditable((prev) => !prev);
	};

	const validationSchema = Yup.object({
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
		drPrescriberNo: Yup.string().required('Prescriber Code cannot be blank'),
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
			onSubmit={async (values, actions) => {

				//USERFRONT UPDATE USER
				console.log(Userfront.user.email)
				console.log(Userfront.user.userId)
				console.log(Userfront.user)

				const payload = {
					userId: Userfront.user.Id,
					email: Userfront.user.email,
					username: Userfront.user.username,
					name: "Jane Doe",
					data: {
					   "isRegistered": true, 
					   "givenName" : values.drGivenName, 
					   "surName": values.drSurname
					}
				  };

				  const response = await fetch(`https://api.userfront.com/v0/users/${Userfront.user.userId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer uf_test_admin_xbrr9qdb_7736f64fe39cc8c574d13d41234600a8"
					}, 
					body: JSON.stringify(payload)
					});

					values.drId = Userfront.user.userId

				//BACKEND SET UP
				// actions.setSubmitting(false);
				// dispatch(modifyDoctorById(values));
				
				// if (doctors.error == '') {
				// 	alert('Update doctor profile successfully!');
				// }
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									Practioner's details
									<Box
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<Button
											type="button"
											onClick={toggleEdit}
											style={{
												marginRight: '1rem',
												display: `${editable === true ? 'block' : 'none'}`,
											}}
										>
											Cancel
										</Button>
										<button type="button" onClick={toggleEdit}>
											<EditIcon />
										</button>
									</Box>
								</Box>
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<InputField
							name="drPreferredName"
							type="text"
							label="Preferred name"
							placeholder="Preferred name (optional)"
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
							readOnly={!editable}
						/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drDOB"
								type="date"
								label="Date of birth (dd/mm/yyyy)"
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
								readOnly={!editable}
							/>
							<BirthSexField
								name="drBirthSex"
								label="Birth sex"
								value={doctor.drBirthSex}
								disabled={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							>
								<BirthSexSelectField />
							</BirthSexField>
						</SimpleGrid>
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								Contact details
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drEmail"
								type="email"
								label="Email adress"
								placeholder="Email address"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drPhone"
								type="text"
								label="Phone number"
								placeholder="Phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="drAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drAddress.city"
								type="text"
								label="City"
								placeholder="City"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drAddress.state"
								type="text"
								label="State"
								placeholder="State"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drAddress.country"
								type="text"
								label="Country"
								placeholder="Country"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drCode"
								type="text"
								label="Practioner's code"
								placeholder="Practioner's code"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drPrescriberNo"
								type="text"
								label="Prescriber No"
								placeholder="Prescriber code"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drClinicName"
								type="text"
								label="Clinic name"
								placeholder="Clinic name"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="drQualifications"
								type="text"
								label="Qualifications"
								placeholder="Qualifications"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<LanguagesSpokenField
							name="drLanguagesSpoken"
							label="Languages spoken"
							onChange={formik.handleChange}
							value={doctor.drLanguagesSpoken}
						>
							<LanguagesSpokenSelectField />
						</LanguagesSpokenField>
						<Button
							type="submit"
							colorScheme="blue"
							variant="solid"
							w="100%"
							my={5}
							disabled={!edited}
							style={{
								display: `${editable === true ? 'block' : 'none'}`,
							}}
						>
							Update doctor's profile
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default DoctorUpdateProfileForm;
