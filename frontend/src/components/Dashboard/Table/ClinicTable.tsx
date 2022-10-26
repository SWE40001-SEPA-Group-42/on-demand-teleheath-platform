import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Column,
  Table as ReactTable,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  sortingFns,
  getSortedRowModel,
  SortingState,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const ClinicTable = () => {
  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Box mb="100px">
      <Flex className="w-full">
        {/* <DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					className="w-3/4 p-4 font-lg shadow border rounded-md"
					placeholder="Search doctor"
				/> */}
      </Flex>
      <Table variant="striped" colorScheme="linkedin">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    // onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    className="w-auto"
                  >
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex justify-center items-center h-12 text-sm text-center'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const meta: any = cell.column.columnDef.meta;
                return (
                  <>
                    <Td
                      className="text-sm"
                      style={{ textAlign: 'center' }}
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  </>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ClinicTable;

type Doctor = {
  drId: String;
  drName: String;
  drGender: String;
  drLanguagesSpoken: String;
  drSpecialisations: String;
};

const data: Doctor[] = [
  {
    drId: '1',
    drName: 'Peter',
    drGender: 'Male',
    drLanguagesSpoken: 'Vietnamese',
    drSpecialisations: 'Men Health',
  },
  {
    drId: '2',
    drName: 'Cath',
    drGender: 'Female',
    drLanguagesSpoken: 'English',
    drSpecialisations: 'Woman Health',
  },
  {
    drId: '3',
    drName: 'Katy',
    drGender: 'Female',
    drLanguagesSpoken: 'English',
    drSpecialisations: 'Mental Health',
  },
];

const columnHelper = createColumnHelper<Doctor>();

const columns = [
  columnHelper.accessor('drId', {
    cell: (info) => info.getValue(),
    header: 'Doctor ID',
  }),
  columnHelper.accessor('drName', {
    cell: (info) => info.getValue(),
    header: 'Doctor Name',
  }),
  columnHelper.accessor('drGender', {
    cell: (info) => info.getValue(),
    header: 'Gender',
  }),
  columnHelper.accessor('drLanguagesSpoken', {
    cell: (info) => info.getValue(),
    header: 'Languages Spoken',
  }),
  columnHelper.accessor('drSpecialisations', {
    cell: (info) => info.getValue(),
    header: 'Specialisations',
  }),
];
