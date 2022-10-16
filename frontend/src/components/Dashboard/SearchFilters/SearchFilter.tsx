// import React, { ChangeEvent, useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	SimpleGrid,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AgeSlider from './AgeSlider';
import GenderField from './GenderField';

type FilterLabelProps = {
	label: string;
};

const FilterLabel = ({ label }: FilterLabelProps) => {
	return (
		<>
			<Text className="filter-label">{label}</Text>
		</>
	);
};

const specialisations = [
	'General Practioner',
	'Physiotherapist',
	'Psychiatrist',
	'Psychologist',
	'Radiologist',
	'Pediatrician',
	"Women's Health",
	"Men's Health",
];

const specialisationsOptions = specialisations.map((specialty) => (
	<Checkbox value={specialty}>{specialty}</Checkbox>
));

const languagesSpoken = [
	'English',
	'Mandarin',
	'Vietnamese',
	'Hindi',
	'Cantonese',
	'Greek',
];

const languagesSpokenOptions = languagesSpoken.map((language) => (
	<Checkbox value={language}>{language}</Checkbox>
));

// type CheckboxItemProps = {
// 	value: string;
// 	checked: boolean;
// 	callback: (event: ChangeEvent<HTMLInputElement>) => void;
// };

// const CheckboxItem = ( { value, checked, callback }: CheckboxItemProps) => {
// 	return (
// 		<Checkbox
//       value={value}
// 			isChecked={checked}
// 			onChange={callback}
// 		>
// 			{value}
// 		</Checkbox>
// 	);
// };

// (e) => setChecked(e.target.checked)

type CheckboxFilterProps = {
	label: string;
	options: React.ReactNode;
	defaultVal?: (string | number)[];
};

const CheckboxFilter = ({
	label,
	options,
	defaultVal,
}: CheckboxFilterProps) => {
	return (
		<Box className="py-2">
			<FilterLabel label={label} />
			<CheckboxGroup colorScheme="blue" defaultValue={defaultVal}>
				<SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={1}>
					{options}
				</SimpleGrid>
			</CheckboxGroup>
		</Box>
	);
};

const AgeFilter = () => {
	return (
		<>
			<FilterLabel label="Age" />
			<AgeSlider />
		</>
	);
};

const GenderFilter = () => {
	return (
		<>
			<FilterLabel label="Gender" />
			<GenderField />
		</>
	);
};
const SearchFilter = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const [checked, setChecked] = useState(false);

	return (
		<Box>
			<Flex className="w-full justify-center items-center content-center">
				<Button
					rightIcon={<ChevronDownIcon />}
					colorScheme="blue"
					variant="unstyled"
					onClick={onOpen}
					className="text-center"
				>
					Refine search
				</Button>
			</Flex>
			<Modal
				size="lg"
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				closeOnEsc
				closeOnOverlayClick
			>
				<ModalOverlay />
				<ModalContent className="px-10 py-5">
					<ModalHeader>
						<Text className="text-lg">Search doctors by</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box className="">
							<CheckboxFilter
								label="Specialisations"
								options={specialisationsOptions}
							/>
							<CheckboxFilter
								label="Languages Spoken"
								options={languagesSpokenOptions}
								defaultVal={['English']}
							/>
							<AgeFilter />
							<GenderFilter />
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="green">Show results</Button>
						{/* <Button
							colorScheme="red"
							variant="outline"
							onClick={() => setChecked((c) => !c)}
						>
							Reset
						</Button> */}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default SearchFilter;
