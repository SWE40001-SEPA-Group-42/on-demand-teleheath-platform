import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Heading,
	SimpleGrid,
} from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';
import LanguagesSpokenField from '../../components/CustomFormFields/LanguagesSpokenField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice';
import { useParams } from 'react-router-dom';

import { EditIcon } from '@chakra-ui/icons';

type Doctor = {
	_id: string,
	drGivenName: string,
	drSurname: string,
	drPreferredName: string
	drDOB: string,
	drBirthSex: string,
	drEmail: string,
	drPhone: string,
	drAddress: string,
	line1: string,
	line2: string,
	city: string,
	state: string,
	postcode: string,
	country: string
	drCode: string,
	drPrescriberNo: string,
	drQualifications: string,
	drLanguagesSpoken: string,
	drClinicName: string
}

const DoctorDetailsForm = () => {
	const currentDate = new Date();
	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)
	const [doctor, setDoctor] = useState<Doctor>({
		_id: "",
		drGivenName: "",
		drSurname: "",
		drPreferredName: "",
		drDOB: "",
		drBirthSex: "",
		drEmail: "",
		drPhone: "",
		drAddress: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		postcode: "",
		country: "",
		drCode: "",
		drPrescriberNo: "",
		drQualifications: "",
		drLanguagesSpoken: "",
		drClinicName: ""
	})
	const [edited, setEdited] = useState<boolean>(false)
	const [editable, setEditable] = useState<boolean>(false)

	useEffect(() => {
		dispatch(fetchDoctors())
	}, [])

	useEffect(() => {
		if (doctors.data.length > 0) {
			setDoctor(doctors.data[0])
		}
		// console.log(doctors.data[0])
	}, [doctors])

	const enableEdit = () => {
		setEditable(true)
	}


	console.log(doctor)

	// const id = useParams()

	return (
		doctor.drGivenName !== ""
			? <div>
				<Formik
					initialValues={{
						drDateCreated: currentDate.toISOString(),
						...doctor,
						drDOB: doctors.data[0].drDOB.substring(0, 10)
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
						drCode: Yup.string().required("Doctor's code cannot be blank"),
						drPrescribeCode: Yup.string().required(
							'Prescriber Code cannot be blank'
						),
						drClinicName: Yup.string()
							.required('Clinic cannot be blank')
							.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
						drQualifications: Yup.string()
							.required('Qualifications cannot be blank')
							.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
					})}
					onSubmit={(values) => {
						alert(JSON.stringify(values))
						// console.log(JSON.stringify(values));
					}}
				>
					{(formik) => (
						<Box px={[4, 4, 20, 40]} h="100vh">
							<Box py={4}>
								<Heading as="h1" size="lg" py={4}>
									<div style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}>
										<h2>Doctor's Details</h2>
										<div>
											<Button>Cancel</Button>
											<button onClick={enableEdit}><EditIcon /></button>
										</div>
									</div>
								</Heading>
								<hr />
							</Box>
							<form style={{
								paddingBottom: '100px'
							}}>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="drGivenName"
										type="text"
										label="Given name(s)"
										placeholder="Given name(s)"
										readOnly={!editable}
									/>
									<InputField
										name="drSurname"
										type="text"
										label="Surname"
										placeholder="Surname"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<InputField
									name="drPreferredName"
									type="text"
									label="Preferred name"
									placeholder="Preferred name (optional)"
									readOnly={!editable}
								/>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="drDOB"
										type="date"
										label="Date of birth (dd/mm/yyyy)"
										readOnly={!editable}
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
										readOnly={!editable}
									/>
									<InputField
										name="drPhone"
										type="text"
										label="Phone number"
										placeholder="Phone number"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={1} spacing={0}>
									<InputField
										name="line1"
										type="text"
										label="Address Line 1"
										placeholder="Street address, P.O. box, company name, c/o"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={1} spacing={0}>
									<InputField
										name="line2"
										type="text"
										label="Address Line 2"
										placeholder="Apt, Suite, Unit, Building, Floor"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="city"
										type="text"
										label="City"
										placeholder="City"
										readOnly={!editable}
									/>
									<InputField
										name="state"
										type="text"
										label="State"
										placeholder="State"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="postcode"
										type="text"
										label="Postcode"
										placeholder="Postcode"
										readOnly={!editable}
									/>
									<InputField
										name="country"
										type="text"
										label="Country"
										placeholder="Country"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="drCode"
										type="text"
										label="Practioner's code"
										placeholder="Practioner's code"
										readOnly={!editable}
									/>
									<InputField
										name="drPrescriberNo"
										type="text"
										label="Prescriber Code"
										placeholder="Prescriber code"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
									<InputField
										name="drClinicName"
										type="text"
										label="Clinic name"
										placeholder="Clinic name"
										readOnly={!editable}
									/>
									<InputField
										name="drQualifications"
										type="text"
										label="Qualifications"
										placeholder="Qualifications"
										readOnly={!editable}
									/>
								</SimpleGrid>
								<LanguagesSpokenField name="drLanguages" label="Languages spoken" />
								<Button
									type="submit"
									colorScheme="blue"
									variant="solid"
									w="100%"
									my={5}
									disabled={!edited}
									style={{
										display: `${!edited == true ? 'none' : 'block'}`
									}}
								>
									Update profile
								</Button>
							</form>
						</Box>
					)}
				</Formik>
			</div>
			: <div></div>
	);
};

export default DoctorDetailsForm;
