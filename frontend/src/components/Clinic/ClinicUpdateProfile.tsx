// import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../CustomFormFields/InputField';

interface IClinicUpdateProfile {}

const ClinicUpdateProfile: React.FC<IClinicUpdateProfile> = () => {
	const currentDate = new Date().toISOString();

	return (
		<Formik
			initialValues={{
				clCreatedAt: currentDate,
				clName: '',
				clEmail: '',
				clAddress: {
					line1: '',
					line2: '',
					city: '',
					state: '',
					postcode: '',
					country: '',
				},
				clUrl: '',
			}}
			validationSchema={Yup.object({
				clName: Yup.string()
					.required('Clinic name is required')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				clEmail: Yup.string()
					.required('Email address cannot be blank')
					.email('Please enter valid email address'),
				clPhone: Yup.string()
					.required('Phone number is required')
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						'Please enter a valid phone number'
					),
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
				clUrl: Yup.string().matches(
					/^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/*)?$/gm
				),
			})}
			onSubmit={(values) => {
				console.log(JSON.stringify(values));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
				<form onSubmit={formik.handleSubmit} className="form-container">
					<Box py={4} className="text-center">
						<Heading as="h1" size="md" py={4}>
							Clinic's details
						</Heading>
						<hr />
					</Box>
					<InputField
						name="clName"
						type="text"
						label="Clinic name"
						placeholder="Clinic name"
					/>
					<SimpleGrid
						columns={[1, 1, 1, 1, 1, 2]}
						spacing={[1, 1, 1, 1, 1, 4]}
					>
						<InputField
							name="clEmail"
							type="email"
							label="Email address"
							placeholder="Email address"
						/>
						<InputField
							name="clPhone"
							type="text"
							label="Phone number"
							placeholder="Phone number"
						/>
					</SimpleGrid>
					<InputField
						name="clUrl"
						type="text"
						label="Website"
						placeholder="Website"
					/>
						<InputField
							name="clAddress.line1"
							type="text"
							label="Address Line 1"
							placeholder="Street address, P.O. box, company name, c/o"
						/>
						<InputField
							name="clAddress.line2"
							type="text"
							label="Address Line 2"
							placeholder="Apt, Suite, Unit, Building, Floor"
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
						/>
						<InputField
							name="clAddress.state"
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
							name="clAddress.postcode"
							type="text"
							label="Postcode"
							placeholder="Postcode"
						/>
						<InputField
							name="clAddress.country"
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
						Add clinic
					</Button>
				</form>
			</Box>
			)}
		</Formik>
	);
};

export default ClinicUpdateProfile;
