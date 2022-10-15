import DashboardTable from './Table/DashboardTable';
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
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
     Avatar, AvatarBadge, AvatarGroup, Text 
  } from '@chakra-ui/react';
import Navbar from './Navbar';

const patient = {
    name: 'Emily Cooper',
    imgSrc: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
};

const Dashboard = () => {
    return (
        <>
            <Navbar ptName={patient.name} ptImgSrc={patient.imgSrc} />
             <Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{fontWeight: "bold"}}>Welcome, {patient.name}</Text>
            <DashboardTable />
        </>
    )
};


{/* <Menu>
    <MenuButton as={IconButton} icon={ <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />}>
    </MenuButton>
    <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
    </MenuList>
</Menu> */}


export default Dashboard;