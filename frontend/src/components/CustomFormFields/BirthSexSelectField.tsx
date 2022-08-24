import { Select } from '@chakra-ui/react';

const SelectBirthSexField = () => {
  return (
    <Select placeholder="Select an option">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  );
};

export default SelectBirthSexField;