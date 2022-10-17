import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../../CustomFormFields/InputField';

const PatientSignUp = () => {
	const currentDate = new Date();
	const navigate = useNavigate();

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
				console.log(JSON.stringify(values));

				// redirect to patient/profile/add
				navigate('/patient/profile/add');
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 4, 4, 8, 8, 10]} h="100vh" className="form-margin-y">
					<form onSubmit={formik.handleSubmit} className="form-container">
						<Box py={4} className="text-center">
							<Heading as="h1" size="md" py={4}>
								Patient sign up
							</Heading>
							<Divider orientation="horizontal" />
						</Box>
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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
						<SimpleGrid
							columns={[1, 1, 1, 1, 1, 2]}
							spacing={[1, 1, 1, 1, 1, 4]}
						>
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