import {
	Avatar,
	AvatarBadge,
	AvatarGroup,
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
  Link,
	useBreakpointValue,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	Text,
	Wrap,
	WrapItem,
	VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface NavbarProps {
	ptName: string;
	ptImgSrc: string;
}

const Navbar: React.FC<NavbarProps> = ({ ptName, ptImgSrc }) => {
	return (
		<Box
			as="nav"
			bg="bg-surface"
			boxShadow={useColorModeValue('sm', 'sm-dark')}
		>
			<HStack py={{ base: '4', lg: '5' }} px="20px">
				<Flex justify="space-between" flex="1">
					<h1>Logo here</h1>
					<HStack spacing="3">
						<IconButton
							aria-label="Notifications"
							size="md"
							colorScheme=""
							variant="unstyled"
							icon={<BellIcon color={'gray.400'} w={6} h={6} />}
						/>
						<Link as={ReachLink} to="/patient/profile">
							<Avatar size="md" name={ptName} src={ptImgSrc}>
								<AvatarBadge bg="green.500" boxSize="1.25em" />
							</Avatar>
						</Link>
						<VStack align="flex-start">
							<Box>
								<Text fontSize="md" fontWeight="600" align="left">
									{ptName}
								</Text>
							</Box>
							<Box>
								<Text fontSize="sm" align="left">
									Patient
								</Text>
							</Box>
						</VStack>
						<IconButton
							aria-label="Patient Menu"
							size="md"
							colorScheme=""
							variant="unstyled"
							icon={<ChevronDownIcon color={'gray.400'} w={6} h={6} />}
						/>
					</HStack>
				</Flex>
			</HStack>
		</Box>
	);
};

export default Navbar;
