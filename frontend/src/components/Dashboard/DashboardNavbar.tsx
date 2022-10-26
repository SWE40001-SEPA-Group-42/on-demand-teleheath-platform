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
import DashboardProfile from './DashboardProfile';
import Userfront from '@userfront/react';
Userfront.init(process.env.REACT_APP_USERFRONT_INIT);



interface IDashboardNavbar {
	userName: string;
	userImgSrc: string;
}

const route = "/patient/profile"

const DashboardNavbar: React.FC<IDashboardNavbar> = ({ userName, userImgSrc }) => {
	return (
		<Box
			as="nav"
			bg="bg-surface"
			boxShadow={useColorModeValue('sm', 'sm-dark')}
		>
			<HStack py={{ base: '4', lg: '5' }} px="20px">
				<Flex justify="space-between" flex="1">
					<h1>Logo here</h1>
					<DashboardProfile userProfileName={userName} userProfileImgSrc={userImgSrc} />
					
				</Flex>
			</HStack>
		</Box>
	);
};

export default DashboardNavbar;