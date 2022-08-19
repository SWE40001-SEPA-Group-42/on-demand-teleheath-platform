import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import TextField from '../../components/CustomFormFields/TextField';
import BirthSexField from '../../components/CustomFormFields/BirthSexField';

interface Props {}
const NewPatient: React.FC<Props> = () => {
  const currentDate = new Date();
	// const toast = useToast();

  return (
    <Formik
      initialValues={{
				username: '',
				password: '',
        firstName: '',
        lastName: '',
				preferredName: '',
				dob: '',
				birthSex: '',
        joined: currentDate.toISOString(),
        email: '',
        mobile: '',
        address: {
          line1: '',
          line2: '',
          postcode: '',
          city: '',
          state: '',
          country: '',
        },
      }}
      validationSchema={Yup.object({
				username: Yup.string()
					.required('Username cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				password: Yup.string()
					.required('Password cannot be blank')
					.matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit and one special character.'),
				firstName: Yup.string()
					.required('First name cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				lastName: Yup.string()
					.required('Last name cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				preferredName: Yup.string()
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				dob: Yup.string()
					.required('Date of Birth cannot be blank')
					.matches(
						/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
						'Please enter a valid date in the format: YYYY-MM-DD'
					),
				birthSex: Yup.string()
						.required('Birth sex cannot be blank'),
				joined: Yup.string().required('Date Created At cannot be blank'),
				email: Yup.string()
					.required('Email Address cannot be blank')
					.email('Please enter valid email address'),
				mobile: Yup.string()
					.required('Phone Number cannot be blank')
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						'Please enter a valid phone number'
					),
				address: Yup.object({
					country: Yup.string()
						.required('Country cannot be blank')
						.matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/, 'Please enter a valid country'),
					line1: Yup.string()
						.required('Address Line 1 cannot be blank')
						.matches(/^[ A-Za-z0-9_./#&-]*$/, 'Please enter a valid address'),
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
						.matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/, 'Please enter a valid state'),
					postcode: Yup.string()
						.required('Postcode cannot be blank')
						.matches(/^[A-Za-z0-9]+$/, 'Please enter a valid postcode'),
				}),
			})}
			onSubmit={async (values) => {
				await new Promise((r) => setTimeout(r, 500));
				alert(JSON.stringify(values, null, 2));
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg">Patient sign up</Heading>
						<Text py={4} fontSize="sm">
							Create a free account to book a remote consultation faster and have a personalised health experience.
						</Text>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
            <TextField
								name="userName"
								type="text"
								label="Username"
								placeholder="janesmith"
							/>
              <TextField
								name="password"
								type="password"
								label="Password"
							/>
							<TextField
								name="firstName"
								type="text"
								label="First Name"
								placeholder="Jane"
							/>
							<TextField
								name="lastName"
								type="text"
								label="Last Name"
								placeholder="Smith"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<TextField
								name="dob"
								type="date"
								label="Date of Birth"
							/>
							<BirthSexField
								name="birthsex"
								label="Birth Sex"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<TextField
								name="email"
								type="email"
								label="Email"
								placeholder="janesmith@patient.com"
							/>
							<TextField
								name="phone"
								type="text"
								label="Phone Number (incl. country code)"
								placeholder="+61 ..."
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<TextField
								name="address.line1"
								type="text"
								label="Address Line 1"
								placeholder="Street address, P.O. box, company name, c/o"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<TextField
								name="address.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, Unit, Building, Floor"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<TextField
								name="address.city"
								type="text"
								label="City"
								placeholder="City"
							/>
							<TextField
								name="address.state"
								type="text"
								label="State"
								placeholder="State"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<TextField
								name="address.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
							/>
							<TextField
								name="address.country"
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
							Submit
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default NewPatient;