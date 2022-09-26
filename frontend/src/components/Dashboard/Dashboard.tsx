import React from "react";
import DashboardTable from "./Table/DashboardTable";
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
  } from '@chakra-ui/react'


const Dashboard = () => {
    return (
        <>
            <NavBar />
             <Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{fontWeight: "bold"}}>DASHBOARD</Text>
            <DashboardTable />
        </>
    )
}



const NavBar = () => {
    return (
        <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
          <HStack  py={{ base: '4', lg: '5' }} px="20px">
              <Flex justify="space-between" flex="1">
                <h1>Logo here</h1>
                <HStack spacing="3">

                    {/* {This area is put for Profile} */}

                </HStack>
              </Flex>
          </HStack>

      </Box>
    )
}


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