import DashboardTable from './Table/PatientTable';
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
    VStack,
    Link,
     Avatar, AvatarBadge, AvatarGroup, Text 
  } from '@chakra-ui/react';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import PatientTable from '../Dashboard/Table/PatientTable';
const patient = {
    imgSrc: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
	givenName: 'Emily',
	surname: 'Cooper',
};

const Dashboard = () => {
    const patientName = [patient.givenName, patient.surname].join(' ');

    return (
        <>
            <DashboardNavbar userName={patientName} userImgSrc={patient.imgSrc} />
             <Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{fontWeight: "bold"}}>Welcome, {patientName}</Text>
             <Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{fontWeight: "bold"}}>DASHBOARD</Text>
            <PatientTable />
        </>
    )
};

//  <Menu>
//     <MenuButton as={IconButton} icon={ <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />}>
//     </MenuButton>
//     <MenuList>
//         <MenuItem>Download</MenuItem>
//         <MenuItem>Create a Copy</MenuItem>
//         <MenuItem>Mark as Draft</MenuItem>
//         <MenuItem>Delete</MenuItem>
//         <MenuItem>Attend a Workshop</MenuItem>
//     </MenuList>
// </Menu>


export default Dashboard;