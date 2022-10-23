import { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel } from '@chakra-ui/react';

type Props = InputHTMLAttributes<HTMLElement> & {
	label: string;
	name: string;
	defaultValue?: string;
};

const BirthSexField: React.FC<Props> = ({ label, defaultValue, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl py={2}>
			<FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
			<select
				{...field}
				{...props}
				className="css-10ex9a1"
				value={defaultValue}
				style={{width: "100%", borderRadius: "5px", background: "transparent", border: "1px solid black"}}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</FormControl>
	);
};

export default BirthSexField;
