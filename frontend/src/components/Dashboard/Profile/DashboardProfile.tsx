import React from "react";
import {
    Avatar, AvatarBadge, AvatarGroup,
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Logout } from "../../Authentication";

interface IDashboardProfile {
    userProfileName: string;
    userProfileImgSrc?: string;
}

const DashboardProfileSummary: React.FC<IDashboardProfile> = ( { userProfileName }) => {
    return (
        <Stack>
            <IconButton
                aria-label="Notifications"
                size="md"
                colorScheme=""
                variant="unstyled"
                icon={<BellIcon color={'gray.400'} w={6} h={6} />}
            />
            <VStack align="flex-start">
                <Box>
                    <Text fontSize="md" fontWeight="600" align="left">
                        {userProfileName}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="left">
                        Patient
                    </Text>
                </Box>
            </VStack>
        </Stack>
    );
};

const DashboardProfile: React.FC<IDashboardProfile> = ({ userProfileName, userProfileImgSrc }) => {
    return (
        <>
            <Menu>
                <MenuButton style={profileStyled} _hover={profileStyledHover} as={IconButton} icon={<Avatar name={userProfileName} src={userProfileImgSrc} />}>
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Profile'>
                        <Link as={ReachLink} to='patient/profile'>
                            <MenuItem>
                                My Profile
                            </MenuItem>
                        </Link>
                    </MenuGroup>
                    <MenuItem>
                        <Logout />
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}


{/* <HStack spacing="3" _hover={{background: 'red'}}>
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
</HStack> */}

const profileStyled = {
    backgroundColor: 'transparent',
}

const profileStyledHover = {
    opacity: '70%'
}

export default DashboardProfile