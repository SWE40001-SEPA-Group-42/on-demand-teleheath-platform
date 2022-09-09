import { Select } from '@chakra-ui/react';

const BirthSexSelectField = () => {
  return (
    <Select placeholder="Select an option">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  );
};

export default BirthSexSelectField;