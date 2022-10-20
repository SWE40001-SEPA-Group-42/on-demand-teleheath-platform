import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Userfront from '@userfront/react';
import {
	Box,
	Button,
	Divider,
	Heading,
	SimpleGrid,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useToast
} from '@chakra-ui/react';
import InputField from '../../CustomFormFields/InputField';
import BirthSexField from '../../CustomFormFields/BirthSexField';
import BirthSexSelectField from '../../CustomFormFields/BirthSexSelectField';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addPatient } from '../../../redux/Patient/patientsSlice';
import { Doctor } from '../../../types/Doctor';
import { Patient } from '../../../types/Patient';


import {validationSchema} from './PatientHelper'

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);



// console.log(Userfront.user)

// console.log(Userfront.tokens)

const initialValues = {
	ptGivenName: '',
	ptSurname: '',
	ptPreferredName: '',
	ptDOB: '',
	ptBirthSex: '',
	ptEmailAddress: '',
	ptMobilePhone: '',
	ptHomePhone: '',
	ptWorkPhone: '',
	ptAddress: {
		line1: '',
		line2: '',
		city: '',
		state: '',
		postcode: '',
		country: '',
	},
	ptMedicareCardNo: '',
	ptMedicareCardIRN: '',
	ptMedicareCardExpiryDate: '',
	ptPrivateHealthFund: '',
	ptPrivateHealthFundNo: '',
	ptEmgContactGivenName: '',
	ptEmgContactSurname: '',
	ptEmgContactRelationship: '',
	ptEmgContactMobilePhone: '',
	ptEmgContactHomePhone: '',
	ptEmgContactWorkPhone: '',
	ptNextOfKinGivenName: '',
	ptNextOfKinSurname: '',
	ptNextOfKinRelationship: '',
	ptNextOfKinMobilePhone: '',
	ptNextOfKinHomePhone: '',
	ptNextOfKinWorkPhone: '',
	ptDVAFileNo: '',
	ptDVAExpiryDate: '',
	ptHealthcareCardNo: '',
	ptHealthcareCardExpiryDate: '',
	ptPensionCardNo: '',
	ptPensionCardExpiryDate: '',
};



const PatientBasicDetails = () => {
	const toast = useToast()

	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);


	async function ptUserFrontHandler(values : Patient){
		//USERFRONT API
		try {
		const payload = {
			email: values.ptEmailAddress,
			username: values.ptGivenName.trim() + values.ptSurname.trim(),
			name: values.ptGivenName.trim() + " " + values.ptSurname.trim(),
			data: {
				isRegistered: true, 
				ptGivenName: values.ptGivenName,
				ptSurname: values.ptSurname
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
			onSubmit={(values) => {
				//USERFRONT
				ptUserFrontHandler(values); 
				//BACKEND
				// console.log(JSON.stringify(values));
				// dispatch(addPatient(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								About me
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="ptSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
							/>
						</SimpleGrid>
						<InputField
							name="ptPreferredName"
							type="text"
							label="Preferred name"
							placeholder="Preferred name (optional)"
						/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField name="ptDOB" type="date" label="Date of birth" />
							<BirthSexField name="ptBirthSex" label="Birth sex">
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
								name="ptEmailAddress"
								type="email"
								label="Email address"
								placeholder="Email address"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
							/>
							{/* <InputField
								name="ptHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/> */}
							<InputField
								name="ptWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptAddress.city"
								type="text"
								label="City"
								placeholder="City"
							/>
							<InputField
								name="ptAddress.state"
								type="text"
								label="State"
								placeholder="State"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptAddress.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
							/>
							<InputField
								name="ptAddress.country"
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
							Save changes
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

const PatientAdditionalDetails = () => {
	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);

	return (
		<Formik
			initialValues={initialValues}
			// validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
				dispatch(addPatient(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								Medicare and private health insurance
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<InputField
							name="ptMedicareCardNo"
							type="text"
							label="Medicare number"
							placeholder="Medicare number"
						/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 2, 2]}
							spacing={[1, 1, 1, 1, 4, 4]}
						>
							<InputField
								name="ptMedicareCardIRN"
								type="text"
								label="IRN"
								placeholder="IRN"
							/>
							<InputField
								name="ptMedicareCardExpiryDate"
								type="date"
								label="Valid until"
								placeholder="Valid until"
							/>
						</SimpleGrid>
						<InputField
							name="ptPrivateHealthFund"
							type="text"
							label="Private health fund"
							placeholder="Private health fund"
						/>
						<InputField
							name="ptPrivateHealthFundNo"
							type="text"
							label="Private health fund number"
							placeholder="Private health fund number"
						/>
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								Emergency contact
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptEmgGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="ptEmgSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptEmgRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
							/>
							<InputField
								name="ptEmgMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptEmgHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/>
							<InputField
								name="ptEmgWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
							/>
						</SimpleGrid>
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								Next of kin
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptNextOfKinGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="ptNextOfKinSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptNextOfKinRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
							/>
							<InputField
								name="ptNextOfKinMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptNextOfKinHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/>
							<InputField
								name="ptNextofKinWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
							/>
						</SimpleGrid>
						<Box py={4} className="text-center">
							<Heading as="h2" size="md" py={4}>
								DVA, healthcare and pension cards
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptDVAFileNo"
								type="text"
								label="DVA file number"
								placeholder="DVA file number"
							/>
							<InputField
								name="ptDVAExpiryDate"
								type="date"
								label="DVA valid until"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptHealthcareCardNo"
								type="text"
								label="Healthcare card number"
								placeholder="Healthcare card number"
							/>
							<InputField
								name="ptHealthcareCardExpiryDate"
								type="date"
								label="Healthcare card valid until"
							/>
						</SimpleGrid>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptPensionCardNo"
								type="text"
								label="Pension card number"
								placeholder="Pension card number"
							/>
							<InputField
								name="ptPensionCardExpiryDate"
								type="date"
								label="Pension card valid until"
							/>
						</SimpleGrid>
						<Button
							type="submit"
							colorScheme="blue"
							variant="solid"
							w="100%"
							my={5}
						>
							Save changes
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

const PatientAddProfile = () => {
	return (
		<Box>
			<Tabs>
				<TabList>
					<Tab>Basic details</Tab>
					<Tab>Additional details</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<PatientBasicDetails />
					</TabPanel>
					<TabPanel>
						<PatientAdditionalDetails />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default PatientAddProfile;
