import { InputHTMLAttributes } from 'react';
import { Field, useField } from 'formik';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/react';
import LanguagesSpokenSelectField from './LanguagesSpokenSelectField';

type Props = InputHTMLAttributes<HTMLElement> & {
	label: string;
	name: string;
};

const LanguagesSpokenField: React.FC<Props> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isRequired isInvalid={Boolean(meta.error && meta.touched)} py={2}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Field as={LanguagesSpokenSelectField} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default LanguagesSpokenField;