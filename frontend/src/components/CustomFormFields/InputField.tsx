import { InputHTMLAttributes } from 'react';
import { Field, useField } from 'formik';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';

type Props = InputHTMLAttributes<HTMLElement> & {
	label: string;
	name: string;
};

const InputField: React.FC<Props> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={Boolean(meta.error && meta.touched)} py={2}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Field as={Input} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default InputField;
