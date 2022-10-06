import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/react';

type Props = InputHTMLAttributes<HTMLElement> & {
	label: string;
	name: string;
};

const LanguagesSpokenField: React.FC<Props> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl py={2}>
			<FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
			<select {...field} {...props} className="css-10ex9a1" />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</FormControl>
	);
};

export default LanguagesSpokenField;