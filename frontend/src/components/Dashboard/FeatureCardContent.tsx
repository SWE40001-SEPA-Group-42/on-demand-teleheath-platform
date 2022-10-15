import {
	Avatar,
	Box,
	Heading,
	IconButton,
	Link,
	HStack,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';

interface IFeatureCardContent {
	label: string;
	description: string;
}

const FeatureCardContent: React.FC<IFeatureCardContent> = ({
	label,
	description,
}) => {
	return (
		<>
			<Box>
				<Text size="md" fontWeight="600">
					{label}
				</Text>
				<Text>{description}</Text>
			</Box>
		</>
	);
};

export default FeatureCardContent;
