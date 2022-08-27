import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';

interface IPatientSignUpProps {}

const PatientSignUp: React.FC<IPatientSignUpProps> = () => {
	const currentDate = new Date();
	const navigate = useNavigate();

	// const handleSubmit = (event: { preventDefault: () => void }) => {
	// 	event.preventDefault();

	// 	// redirect to patient/profile/add
	// 	navigate('/patient/profile/add');
	// };

	return (
		<Formik
			initialValues={{
				ptDateJoined: currentDate.toISOString(),
				ptUsername: '',
				ptConfirmUsername: '',
				ptPassword: '',
				ptConfirmPassword: '',
			}}
			validationSchema={Yup.object({
				ptUsername: Yup.string()
					.required('Please enter your email address')
					.email('Please enter a valid email address'),
				ptConfirmUsername: Yup.string()
					.required('Please confirm your email address')
					.oneOf([Yup.ref('ptUsername')], 'Email addresses do not match'),
				ptPassword: Yup.string()
					.required('Please enter your password')
					.min(8, 'Password must be at least 8 characters long')
					.matches(
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
						'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit and one special character.'
					),
				ptConfirmPassword: Yup.string()
					.required('Please confirm your password')
					.oneOf([Yup.ref('ptPassword')], 'Passwords do not match'),
			})}
			onSubmit={(values) => {
				// alert(JSON.stringify(values))
				console.log(JSON.stringify(values));

				// redirect to patient/profile/add
				navigate('/patient/profile/add');
			}}
			// onSubmit={(values, { setSubmitting }) => {
			// 	setTimeout(() => {
			// 		alert(JSON.stringify(values, null, 2));
			// 		setSubmitting(false);
			// 	}, 400);
			// }}
			// onSubmit={(
			// 	values: FormValues,
			// 	{ setSubmitting }: FormikHelpers<FormValues>
			// ) => {
			// 	// console.log(JSON.stringify(values))
			// 	setTimeout(() => {
			// 		alert(JSON.stringify(values, null, 2));
			// 		setSubmitting(false);
			// 	}, 500);
			// }}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading as="h1" size="lg">
							Patient sign up
						</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptUsername"
								type="email"
								label="Email address"
								placeholder="Email address"
							/>
							<InputField
								name="ptConfirmUsername"
								type="email"
								label="Confirm email address"
								placeholder="Confirm email address"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="ptPassword"
								type="password"
								label="Password"
								placeholder="Password"
							/>
							<InputField
								name="ptConfirmPassword"
								type="password"
								label="Confirm password"
								placeholder="Confirm password"
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

export default PatientSignUp;
