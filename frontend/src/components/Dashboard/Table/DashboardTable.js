import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
  } from '@chakra-ui/react'

//creating interface or something





const  DashboardTable = () => {
  const sampleData = [
    {
      drName: "Peter", 
      drBirthSex: "Male",
      drLanguageSpoken: "Vietnamese"
    },
    {
      drName: "Katy", 
      drBirthSex: "Female",
      drLanguageSpoken: "English"
    },
    {
      drName: "Cath", 
      drBirthSex: "Female",
      drLanguageSpoken: "English"
    }, 
  ]

    return (
      <div className='w-5/6 mx-auto shadow-lg shadow-gray-100'>
        <TableContainer>
          <Table variant='simple'>
            <TableProperties />

            <Tbody>
               {sampleData.map((row,index) => {
                  <Tr key={row.drName+"-"+index}>
                    <Td>{row.drName}</Td>
                    <Td>{row.drBirthSex}</Td>
                    <Td>{row.drLanguageSpoken}</Td>
                    <Td isNumeric><Button colorScheme='green'>Request</Button></Td>
                  </Tr>
               })}
               {/* <Tr>
                  <Td>haha</Td>
                  <Td>haha</Td>
                  <Td>dss</Td>
                  <Td isNumeric><Button colorScheme='green'>Request</Button></Td>
              </Tr>
              <Tr>
                  <Td>haha</Td>
                  <Td>haha</Td>
                  <Td>dss</Td>
                  <Td isNumeric><Button colorScheme='green'>Request</Button></Td>
              </Tr> */}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    )
}


const TableProperties = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th >Language Spoken</Th>
        <Th isNumeric></Th>
      </Tr>
    </Thead>
  )
}

export default DashboardTable;