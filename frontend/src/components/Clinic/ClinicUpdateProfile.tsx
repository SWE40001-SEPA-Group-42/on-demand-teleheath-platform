import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../CustomFormFields/InputField';
import { EditIcon } from '@chakra-ui/icons';
import { Clinic } from '../../types/Clinic';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateClinicById } from '../../redux/Clinic/clinicsSlice';

interface IClinicUpdateProfile {
	clinic: Clinic;
}

const ClinicUpdateProfile: React.FC<IClinicUpdateProfile> = (props) => {
	const currentDate = new Date().toISOString();
	const clinic = props.clinic;
	const dispatch = useAppDispatch();
	const doctors = useAppSelector((state) => state.doctors);
	const initialValues = {
		...clinic,
	};

	const [edited, setEdited] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);

	const toggleEdit = () => {
		setEditable((prev) => !prev);
	};

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
		}),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
				dispatch(updateClinicById(values));
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
									<h2>Clinic's Details</h2>
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
							<hr />
						</Box>
						<InputField
							name="clName"
							type="text"
							label="Clinic name"
							placeholder="Clinic name"
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
								name="clEmailAddress"
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
								name="clPhone"
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
						<InputField
							name="clUrl"
							type="text"
							label="Website"
							placeholder="Website"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
						/>
						<InputField
							name="clAddress.line1"
							type="text"
							label="Address Line 1"
							placeholder="Street address, P.O. box, company name, c/o"
							readOnly={!editable}
							onChange={(e) => {
								setEdited(true);
								formik.handleChange(e);
							}}
						/>
						<InputField
							name="clAddress.line2"
							type="text"
							label="Address Line 2"
							placeholder="Apt, Suite, Unit, Building, Floor"
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
								name="clAddress.city"
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
								name="clAddress.state"
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
								name="clAddress.postcode"
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
								name="clAddress.country"
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
							Update Clinic profile
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default ClinicUpdateProfile;