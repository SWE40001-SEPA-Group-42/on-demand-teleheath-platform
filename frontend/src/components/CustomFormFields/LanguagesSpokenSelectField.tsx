import { Select } from '@chakra-ui/react';

const LanguagesSpokenSelectField = () => {
	return (
		<Select placeholder="Select an option" multiple>
			<option value="english">English</option>
			<option value="mandarin">Mandarin</option>
			<option value="vietnamese">Vietnamese</option>
			<option value="hindi">Hindi</option>
			<option value="cantonese">Cantonese</option>
			<option value="greek">Greek</option>
      <option value="other">Other</option>
		</Select>
	);
};

export default LanguagesSpokenSelectField;
