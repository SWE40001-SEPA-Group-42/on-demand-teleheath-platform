import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
  } from '@chakra-ui/react'


interface ColumnName {
  drName: String, 
  drBirthSex: String, 
  drLanguageSpoken: String
}


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
            <TableColumnNames />
            <Tbody>
               {sampleData.map(({drName, drBirthSex, drLanguageSpoken}) => (
                  <TableRows drName={drName} drBirthSex={drBirthSex} drLanguageSpoken={drLanguageSpoken} />
               ))}
            </Tbody>
          </Table>
        </TableContainer>


      </div>
    )
}


//component for each row 
const TableRows = ({drName, drBirthSex,drLanguageSpoken} : ColumnName) => {
  return (
    <Tr>
      <Td>{drName}</Td>
      <Td>{drBirthSex}</Td>
      <Td>{drLanguageSpoken}</Td>
      <Td isNumeric><Button colorScheme='green'>Request</Button></Td>
  </Tr>
  )
}


//Contains a list of column names
const TableColumnNames = () => {
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