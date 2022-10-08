import React from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Heading,
	SimpleGrid,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';
import PatientUpdateProfile from '../../components/Patient/PatientUpdateProfile'

interface FormValues {
	// ptDateJoined: string;
	// ptGivenName: string;
	// ptSurname: string;
	// ptPreferredName?: string;
	// ptDOB: string;
	// ptBirthSex: string;
	// ptEmail: string;
	// ptMobile: string;
	// ptAddress: string;
	// line1: string;
	// line2?: string;
	// city: string;
	// state: string;
	// postcode: string;
	// country: string;
}

const PatientBasicDetails: React.FC<FormValues> = () => {
	return (
		<Formik
			initialValues={{
				ptGivenName: '',
				ptSurname: '',
				ptPreferredName: '',
				ptDOB: '',
				ptBirthSex: '',
				ptEmail: '',
				ptMobile: '',
				ptAddress: {
					line1: '',
					line2: '',
					city: '',
					state: '',
					postcode: '',
					country: '',
				},
			}}
			validationSchema={Yup.object({
				ptGivenName: Yup.string()
					.required('Given names cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				ptSurname: Yup.string()
					.required('Surname cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				ptPreferredName: Yup.string().matches(
					/^[A-Za-z]+$/,
					'Only alphabets are allowed for this field'
				),
				ptDOB: Yup.string()
					.required('Date of Birth cannot be blank')
					.matches(
						/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
						'Please enter a valid date in the format: YYYY-MM-DD'
					),
				ptBirthSex: Yup.string().required('Birth sex cannot be blank'),
				ptEmail: Yup.string()
					.required('Email address cannot be blank')
					.email('Please enter valid email address'),
				ptMobile: Yup.string()
					.required('Phone Number cannot be blank')
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						'Please enter a valid phone number'
					),
				ptAddress: Yup.object({
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
			})}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
			}}
			// onSubmit={async(values) => {
			// 	await new Promise((r) => setTimeout(r, 500));
			// 	alert(JSON.stringify(values, null, 2));
			// }}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg" py={4}>
							About me
						</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="ptSurName"
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
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptDOB"
								type="date"
								label="Date of birth (dd/mm/yyyy)"
							/>
							<BirthSexField name="ptBirthSex" label="Birth sex" />
						</SimpleGrid>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								Contact details
							</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptEmail"
								type="email"
								label="Email address"
								placeholder="Email address"
							/>
							<InputField
								name="ptMobile"
								type="text"
								label="Mobile number"
								placeholder="Mobile number"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="ptAddress.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="ptAddress.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
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
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
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

const PatientAdditionalDetails: React.FC<FormValues> = () => {
	return (
		<Formik
			initialValues={{
				ptMedicareCardNo: '',
				ptMedicareIrn: '',
				ptMedicareExpiryDate: '',
				ptPrivHealthFund: '',
				ptPrivHealthFundNo: '',
			}}
			validationSchema={Yup.object({
				ptMedicareCardNo: Yup.string()
					.min(10, 'Medicare card number must be exactly 10 digits long')
					.matches(/^\d{10}$/, 'Only numbers are allowed for this field'),
				ptMedicareIrn: Yup.string().matches(
					/^[0-9]$/,
					'Only numbers are allowed for this field'
				),
				ptMedicareExpiryDate: Yup.string().matches(
					/^(0[1-9]|1[0-2])-\d{4}$/,
					'Please enter a valid date in the format: MM-YYYY'
				),
				ptPrivHealthFund: Yup.string().matches(
					/^[A-Za-z]+$/,
					'Only alphabets are allowed for this field'
				),
				ptPrivHealthFundNo: Yup.string().matches(
					/^[0-9]$/,
					'Only numbers are allowed for this field'
				),
			})}
			// onSubmit={async(values) => {
			// 	await new Promise((r) => setTimeout(r, 500));
			// 	alert(JSON.stringify(values, null, 2));
			// }}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<form onSubmit={formik.handleSubmit}>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								Medicare and private health insurance
							</Heading>
							<hr />
						</Box>
						<InputField
							name="ptMedicareNo"
							type="text"
							label="Medicare number"
							placeholder="Medicare number"
						/>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptMedicareIrn"
								type="text"
								label="IRN"
								placeholder="IRN"
							/>
							<InputField
								name="ptMedicareExpiryDate"
								type="date"
								label="Valid until"
								placeholder="Valid until"
							/>
						</SimpleGrid>
						<InputField
							name="ptPrivHealthFund"
							type="text"
							label="Private health fund"
							placeholder="Private health fund"
						/>
						<InputField
							name="ptPrivHealthFundNo"
							type="text"
							label="Private health fund number"
							placeholder="Private health fund number"
						/>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								Emergency contact
							</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
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
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptEmgRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
							/>
							<InputField
								name="ptEmgMobileNo"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptEmgHomeNo"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/>
							<InputField
								name="ptEmgWorkNo"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
							/>
						</SimpleGrid>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								Next of kin
							</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptNokGivenName"
								type="text"
								label="Given name(s)"
								placeholder="Given name(s)"
							/>
							<InputField
								name="ptNokSurname"
								type="text"
								label="Surname"
								placeholder="Surname"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptNokRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
							/>
							<InputField
								name="ptNokMobileNo"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptNokHomeNo"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/>
							<InputField
								name="ptNokWorkNo"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
							/>
						</SimpleGrid>
						<Box py={4}>
							<Heading as="h1" size="lg" py={4}>
								DVA, healthcare and pension cards
							</Heading>
							<hr />
						</Box>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptDVAFileNo"
								type="text"
								label="DVA file number"
								placeholder="DVA file number"
							/>
							<InputField
								name="ptDVAExpDate"
								type="date"
								label="DVA valid until"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptHealthcareNo"
								type="text"
								label="Healthcare card number"
								placeholder="Healthcare card number"
							/>
							<InputField
								name="ptHealthcareExpDate"
								type="date"
								label="Healthcare card valid until"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptPensionCardNo"
								type="text"
								label="Pension card number"
								placeholder="Pension card number"
							/>
							<InputField
								name="ptPensionCardExpDate"
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

const PatientDetailsForm = () => {
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

export default PatientDetailsForm;
