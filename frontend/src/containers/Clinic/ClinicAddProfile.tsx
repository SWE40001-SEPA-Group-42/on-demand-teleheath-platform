// import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react';
import InputField from '../../components/CustomFormFields/InputField';
import ClinicAddProfileForm from '../../components/Clinic/ClinicAddProfile';

interface FormValues {
	clUsername: string;
	clPassword: string;
	clName: string;
	clEmail: string;
	clPhone: string;
	clAddress: {
		line1: string,
		line2?: string,
		city: string,
		state: string,
		postcode: string,
		country: string,
	};
	clUrl?: string;
}

const ClinicAddProfile = () => {
	return (
		<div>
			<ClinicAddProfileForm/>
		</div>
	)
};

export default ClinicAddProfile;
