import {
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  Link,
  Flex,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import PatientTable from '../Dashboard/Table/PatientTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice';
import Userfront from '@userfront/react';
import { Navigate } from 'react-router-dom';
import DoctorTable from './Table/DoctorTable';
import { HiChevronDown } from 'react-icons/hi';
import ClinicTable from './Table/ClinicTable';
import PatientAddProfileForm from '../Forms/Patient/PatientAddProfileForm';
import DoctorAddProfileForm from '../Forms/Doctor/DoctorAddProfileForm';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

const Dashboard = () => {
  const {
    isOpen: isOpenPatient,
    onOpen: onOpenPatient,
    onClose: onClosePatient,
  } = useDisclosure();

  const {
    isOpen: isOpenDoctor,
    onOpen: onOpenDoctor,
    onClose: onCloseDoctor,
  } = useDisclosure();

  //Check if the user signs up using UserFront Default sign up form
  if (Object.keys(Userfront.user.data).length === 0) {
    return <Navigate to="/patient/profile/add" replace />;
  }

  const user = {
    imgSrc:
      'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
    givenName: Userfront.user.data.givenName,
    surname: Userfront.user.data.surName,
  };

  const userName = [user.givenName, user.surname].join(' ');
  return (
    <>
      {/* Navigation bar */}
      <DashboardNavbar userName={userName} userImgSrc={user.imgSrc} />
      {/* The Welcome, Patient Name */}
      <Box background="#e7effd">
        <Text
          fontSize="2xl"
          textAlign="left"
          style={{ fontWeight: 'bold' }}
          color="#575757"
          pl="45px"
        >
          Welcome, {userName}
        </Text>
        <Box
          width="90%"
          mx="auto"
          height="wrap-content"
          borderRadius="7px"
          boxShadow="md"
          pb="15px"
          background="#FFFFFF"
        >
          {Userfront.user.hasRole('admin') && (
            <Flex alignItems="center" gap="2" width="90%" mx="auto" pt="50px">
              <Box p="1">
                <Text
                  fontSize="2xl"
                  textAlign="left"
                  style={{ fontWeight: 'bold' }}
                  color="#575757"
                >
                  Dashboard
                </Text>
              </Box>
              <Spacer />
              <Box p="2">
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<HiChevronDown />}
                    colorScheme="green"
                    variant="solid"
                  >
                    Add
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onOpenPatient}>
                      {/* <Link href='patient/profile/add'>Add Patient</Link> */}
                      <Modal
                        isOpen={isOpenPatient}
                        onClose={onClosePatient}
                        size="3xl"
                      >
                        {/* <PatientAddProfileForm /> */}
                        <ModalOverlay />
                        <ModalContent>
                          <ModalCloseButton />
                          <PatientAddProfileForm />
                        </ModalContent>
                      </Modal>
                      Add Patient
                    </MenuItem>
                    <MenuItem onClick={onOpenDoctor}>
                      {/* <Link href='doctor/profile/add'>Add Doctor</Link> */}
                      <Modal
                        isOpen={isOpenDoctor}
                        onClose={onCloseDoctor}
                        size="3xl"
                      >
                        {/* <PatientAddProfileForm /> */}
                        <ModalOverlay />
                        <ModalContent>
                          <ModalCloseButton />
                          <DoctorAddProfileForm />
                        </ModalContent>
                      </Modal>
                      Add Doctor
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button colorScheme="blue" ml="10px">
                  <Link href="https://userfront.com/login">View Portal</Link>
                </Button>
              </Box>
            </Flex>
          )}

          <Box w="90%" mx="auto">
            {/* Customised table */}
            {Userfront.user.hasRole('viewer') === true && <h1>PatientView</h1>}
            {Userfront.user.hasRole('member') === true && <h1>DoctorView</h1>}
            {Userfront.user.hasRole('admin') === true && <ClinicTable />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
