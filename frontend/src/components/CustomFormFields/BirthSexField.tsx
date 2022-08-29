import { InputHTMLAttributes } from 'react';
import { Field, useField } from 'formik';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/react';
import BirthSexSelectField from './BirthSexSelectField';

type Props = InputHTMLAttributes<HTMLElement> & {
	label: string;
	name: string;
};

const BirthSexField: React.FC<Props> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isRequired isInvalid={Boolean(meta.error && meta.touched)} py={2}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Field as={BirthSexSelectField} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default BirthSexField;