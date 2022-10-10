import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
} from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';
import BirthSexSelectField from '../../components/CustomFormFields/BirthSexSelectField';

interface IPatientBasicDetails {}

const PatientBasicDetails: React.FC<IPatientBasicDetails> = () => {
	const currentDate = new Date().toISOString();
	const birthSexOptions = ['male', 'female', 'other'];

	const initialValues = {
		ptCreatedAt: currentDate,
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
	};

	const validationSchema = Yup.object({
		ptGivenName: Yup.string()
			.required('Given name(s) cannot be blank')
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
		ptBirthSex: Yup.string()
			.required('Please select your birth sex')
			.oneOf(birthSexOptions),
		ptEmailAddress: Yup.string()
			.required('Email address cannot be blank')
			.email('Please enter valid email address'),
		ptMobilePhone: Yup.string()
			.required('Mobile phone number cannot be blank')
			.matches(
				/^\+(?:[0-9] ?){6,14}[0-9]$/,
				'Please enter a valid phone number (including country code)'
			),
		ptHomePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number (including country code)'
		),
		ptWorkPhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number (including country code)'
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
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
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
							<Heading as="h1" size="md" py={4}>
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
							<InputField
								name="ptMobilePhone"
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
								name="ptHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
							/>
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

interface IPatientAdditionalDetailsProps {}

const PatientAdditionalDetails: React.FC<
	IPatientAdditionalDetailsProps
> = () => {
	const initialValues = {
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

	const validationSchema = Yup.object({
		ptMedicareCardNo: Yup.string()
			.min(10, 'Medicare card number must be exactly 10 digits long')
			.matches(/^\d{10}$/, 'Only numbers are allowed for this field'),
		ptMedicareCardIRN: Yup.string()
			.max(1, 'Medicare card IRN must be exactly 10 digits long')
			.matches(/^[0-9]$/, 'Only numbers are allowed for this field'),
		ptMedicareCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptPrivateHealthFund: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptPrivateHealthFundNo: Yup.string().matches(
			/^[0-9]$/,
			'Only numbers are allowed for this field'
		),
		ptEmgContactGivenName: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactSurname: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactRelationship: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptEmgContactMobilePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptEmgContactHomePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptEmgContactWorkPhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinGivenName: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinSurname: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinRelationship: Yup.string().matches(
			/^[A-Za-z]+$/,
			'Only alphabets are allowed for this field'
		),
		ptNextOfKinMobilePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinHomePhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptNextOfKinWorkPhone: Yup.string().matches(
			/^\+(?:[0-9] ?){6,14}[0-9]$/,
			'Please enter a valid phone number'
		),
		ptDVAFileNo: Yup.string().matches(
			/^\d{10}$/,
			'Only numbers are allowed for this field'
		),
		ptDVAExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptHealthcareCardNo: Yup.string().matches(
			/^\d{10}$/,
			'Only numbers are allowed for this field'
		),
		ptHealthcareCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptPensionCardNo: Yup.string().matches(
			/^\d{10}$/,
			'Only numbers are allowed for this field'
		),
		ptPensionCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$/,
			'Please enter a valid date in the format: MM-YYYY'
		),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
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
							<Heading as="h1" size="md" py={4}>
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
							<Heading as="h1" size="md" py={4}>
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
							<Heading as="h1" size="md" py={4}>
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
