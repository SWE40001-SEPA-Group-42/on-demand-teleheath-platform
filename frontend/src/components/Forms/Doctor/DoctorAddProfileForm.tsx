import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Box, Button, Divider, Heading, SimpleGrid , useToast} from '@chakra-ui/react';
import InputField from '../../CustomFormFields/InputField';
import BirthSexField from '../../CustomFormFields/BirthSexField';
import BirthSexSelectField from '../../CustomFormFields/BirthSexSelectField';
import LanguagesSpokenField from '../../CustomFormFields/LanguagesSpokenField';
import LanguagesSpokenSelectField from '../../CustomFormFields/LanguagesSpokenSelectField';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addDoctor } from '../../../redux/Doctor/doctorsSlice';
import Userfront from '@userfront/react';
import {Doctor} from '../../../types/Doctor'
import {validationSchema} from './DoctorHelpers'


Userfront.init(process.env.REACT_APP_USERFRONT_INIT);



const DoctorAddProfileForm = () => {
	const dispatch = useAppDispatch();
	const doctors = useAppSelector((state) => state.doctors);
	const toast = useToast()
    const navigate = useNavigate()
	const initialValues = {
		drGivenName: '',
		drSurname: '',
		drPreferredName: '',
		drDOB: '',
		drBirthSex: '',
		drEmail: '',
		drPhone: '',
		drAddress: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
		},
		drCode: '',
		drPrescriberNo: '',
		drQualifications: '',
		drLanguagesSpoken: '',
		drClinicName: '',
	};


	async function drUserFrontHandler(values : Doctor) {
		try {
			const payload = {
				email: values.drEmail,
				username: values.drGivenName.trim() + values.drSurname.trim(),
				name: values.drGivenName.trim() + " " + values.drSurname.trim(),
				data: {
					isRegistered: true, 
					ptGivenName: values.drGivenName,
					ptSurname: values.drSurname
				}
				};
				
				const response = await fetch("https://api.userfront.com/v0/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer uf_test_admin_xbrr9qdb_7736f64fe39cc8c574d13d41234600a8"
				}, 
				body: JSON.stringify(payload)
				});
				
				console.log(response.json());
	
			if(response) {
				toast({
					title: 'Account created.',
					description: "We've created your account for you.",
					status: 'success',
					duration: 6000,
					isClosable: true,
				})
			}
		} catch(error) {
			console.log(error)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values, actions) => {
				actions.setSubmitting(false);

				//USERFRONT HANDLER
				drUserFrontHandler(values)


				//BACKEND
				// dispatch(addDoctor(values));
				// if (doctors.error == '') {
				// 	alert('Add doctor profile successfully!');
				// 	// window.location.reload()
				// }
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								Practioner's details
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="drDOB"
								type="date"
								label="Date of birth"
								onChange={formik.handleChange}
							/>
							<BirthSexField
								name="drBirthSex"
								label="Birth sex"
								onChange={formik.handleChange}
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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
							Add new doctor
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default DoctorAddProfileForm;
