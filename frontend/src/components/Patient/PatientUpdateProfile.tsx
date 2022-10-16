import React, { useState } from 'react';
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
	TabPanel
} from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';
import BirthSexSelectField from '../../components/CustomFormFields/BirthSexSelectField';
import { EditIcon } from '@chakra-ui/icons';
import { Patient } from '../../types/Patient';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { modifyPatientById } from '../../redux/Patient/patientsSlice';

interface IPatientBasicDetails {
	patient: Patient;
}

const PatientBasicDetails: React.FC<IPatientBasicDetails> = (props) => {
	const patient = props.patient;
	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);
	const birthSexOptions = ['Male', 'Female', 'Other'];
	const [edited, setEdited] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);

	const toggleEdit = () => {
		setEditable((prev) => !prev);
	};

	const initialValues = {
		...patient,
		ptDOB: patient.ptDOB.substring(0, 10),
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
				dispatch(modifyPatientById(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<h2>About me</h2>
									<div
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
									</div>
								</div>
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
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptSurname"
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
							name="ptPreferredName"
							type="text"
							label="Preferred name"
							placeholder="Preferred name (optional)"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
						/>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptDOB"
								type="date"
								label="Date of birth"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<BirthSexField
								name="ptBirthSex"
								label="Birth sex"
								value={patient.ptDOB}
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
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
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
								name="ptHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
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
								name="ptAddress.line1"
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptAddress.line2"
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
								name="ptAddress.city"
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
								name="ptAddress.state"
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
								name="ptAddress.postcode"
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
								name="ptAddress.country"
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
							Save changes
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

interface IPatientAdditionalDetailsProps {
	patient: Patient;
}

const PatientAdditionalDetails: React.FC<IPatientAdditionalDetailsProps> = (
	props
) => {
	const patient = props.patient;
	const [edited, setEdited] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);

	const toggleEdit = () => {
		setEditable((prev) => !prev);
	};
	const initialValues = {
		...patient,
		ptDOB: patient.ptDOB.substring(0, 10),
	};

	const validationSchema = Yup.object({
		ptMedicareCardNo: Yup.string()
			.min(10, 'Medicare card number must be exactly 10 digits long')
			.matches(/^\d{10}$/, 'Only numbers are allowed for this field'),
		ptMedicareCardIRN: Yup.string()
			.max(1, 'Medicare card IRN must be exactly 10 digits long')
			.matches(/^[0-9]$/, 'Only numbers are allowed for this field'),
		ptMedicareCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$|\s+/,
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
			/^\d{8}$/,
			'Only numbers are allowed for this field. DVA File Number must include 8 numbers.'
		),
		ptDVAExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$|\s/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptHealthcareCardNo: Yup.string().matches(
			/^\d{8}$/,
			'Only numbers are allowed for this field'
		),
		ptHealthcareCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$|\s/,
			'Please enter a valid date in the format: MM-YYYY'
		),
		ptPensionCardNo: Yup.string().matches(
			/^\d{8}$/,
			'Only numbers are allowed for this field'
		),
		ptPensionCardExpiryDate: Yup.string().matches(
			/^(0[1-9]|1[0-2])-\d{4}$|\s/,
			'Please enter a valid date in the format: MM-YYYY'
		),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
				dispatch(modifyPatientById(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<h2>Medicare and Private Health Insurance</h2>
									<div
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
									</div>
								</div>
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<InputField
							name="ptMedicareCardNo"
							type="text"
							label="Medicare number"
							placeholder="Medicare number"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
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
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptMedicareCardExpiryDate"
								type="date"
								label="Valid until"
								placeholder="Valid until"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
						<InputField
							name="ptPrivateHealthFund"
							type="text"
							label="Private health fund"
							placeholder="Private health fund"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
						/>
						<InputField
							name="ptPrivateHealthFundNo"
							type="text"
							label="Private health fund number"
							placeholder="Private health fund number"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
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
								name="ptEmgContactGivenName"
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
								name="ptEmgContactSurname"
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptEmgContactRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptEmgContactMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
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
								name="ptEmgContactHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptEmgContactWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
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
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptNextOfKinSurname"
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
							<InputField
								name="ptNextOfKinRelationship"
								type="text"
								label="Relationship"
								placeholder="Relationship to you"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptNextOfKinMobilePhone"
								type="text"
								label="Mobile phone number"
								placeholder="Mobile phone number"
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
								name="ptNextOfKinHomePhone"
								type="text"
								label="Home phone number"
								placeholder="Home phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptNextofKinWorkPhone"
								type="text"
								label="Work phone number"
								placeholder="Work phone number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
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
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptDVAExpiryDate"
								type="date"
								label="DVA valid until"
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
								name="ptHealthcareCardNo"
								type="text"
								label="Healthcare card number"
								placeholder="Healthcare card number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptHealthcareCardExpiryDate"
								type="date"
								label="Healthcare card valid until"
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
								name="ptPensionCardNo"
								type="text"
								label="Pension card number"
								placeholder="Pension card number"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
							<InputField
								name="ptPensionCardExpiryDate"
								type="date"
								label="Pension card valid until"
								readOnly={!editable}
								onChange={(e) => {
									setEdited(true);
									formik.handleChange(e);
								}}
							/>
						</SimpleGrid>
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
							Save changes
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

interface IPatientUpdateProfileProps {
	patient: Patient;
}

const PatientUpdateProfile: React.FC<IPatientUpdateProfileProps> = (props) => {
	const patient = props.patient;

	return (
		<Box>
			<Tabs>
				<TabList>
					<Tab>Basic details</Tab>
					<Tab>Additional details</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<PatientBasicDetails patient={patient} />
					</TabPanel>
					<TabPanel>
						<PatientAdditionalDetails patient={patient} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default PatientUpdateProfile;
