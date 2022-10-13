import { Select } from '@chakra-ui/react';

const GenderField = () => {
	return (
		<Select placeholder="Select gender">
			<option value="male">Male</option>
			<option value="female">Female</option>
			<option value="other">Other</option>
		</Select>
	);
};

export default GenderField;
