import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Column, useSortBy, useTable} from "react-table"
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

interface Patient {
  drName: string;
  drBirthSex: string;
  drLanguageSpoken: string;
  drSpecialisation: string;
}


const PatientTable = () => {
  const data : Array<Patient> = React.useMemo(
    () => [
        {
          drName: "Peter", 
          drBirthSex: "Male",
          drLanguageSpoken: "Vietnamese", 
          drSpecialisation: "Men Health"
        },
        {
          drName: "Katy", 
          drBirthSex: "Female",
          drLanguageSpoken: "English",
          drSpecialisation: "Woman Health"
        },
        {
          drName: "Cath", 
          drBirthSex: "Female",
          drLanguageSpoken: "English",
          drSpecialisation: "Woman Health"
        }, 
      ]
  , [])



  const columns: Column<Patient>[] = React.useMemo(() => 
  [
    {
      Header: 'Name', 
      accessor: 'drName',
    }, 
    {
      Header: 'Gender', 
      accessor: 'drBirthSex',
    }, 
    {
      Header: 'Language Spoken', 
      accessor: 'drLanguageSpoken',
    }, 
    {
      Header: 'Specilisation',
      accessor: 'drSpecialisation',
    }
  ], [])

  //NJ - This is the error
  // const tableIntance = useTable({columns, data})



    //  const {
    //   getTableProps,
    //   getTableBodyProps,
    //   headerGroups,
    //   rows,
    //   prepareRow,
    // } = tableIntance
    
    return (
      <div className='w-5/6 mx-auto shadow-lg shadow-gray-100'>
          {/* <table {...getTableProps()}>
              <thead>
                {
                headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                    headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {
                        column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                 {
                  rows.map(row => {
                    
                    prepareRow(row)
                    return (
                     
                      <tr {...row.getRowProps()}>
                        {
                        row.cells.map(cell => {
                         
                          return (
                            <td {...cell.getCellProps()}>
                              {
                              cell.render('Cell')}
                            </td>
                          )
                        })}
          </tr>
        )
      })}
              </tbody>
          </table> */}
          <h1>Fixing Dashboard</h1>
      </div>
    )
}




// const TableRow = ({drName, drBirthSex,drLanguageSpoken} : ColumnName) => {
//   return (
//     <Tr>
//       <Td>{drName}</Td>
//       <Td>{drBirthSex}</Td>
//       <Td>{drLanguageSpoken}</Td>
//       <Td isNumeric><Button colorScheme='green'>Request</Button></Td>
//   </Tr>
//   )
// }


//Contains a list of column names
const TableColumnNames = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th >Language Spoken</Th>
        <Th >Language Spoken</Th>
        <Th isNumeric></Th>
      </Tr>
    </Thead>
  )
}


{/* <TableContainer>
          <Table variant='simple'>
            <TableColumnNames />
            <Tbody>
               {sampleData.map(({drName, drBirthSex, drLanguageSpoken}) => (
                  <TableRow drName={drName} drBirthSex={drBirthSex} drLanguageSpoken={drLanguageSpoken} />
               ))}
            </Tbody>
          </Table>
        </TableContainer> */}

export default PatientTable;