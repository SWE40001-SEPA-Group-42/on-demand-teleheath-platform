import React, { useEffect, useState } from 'react';
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
	RankingInfo,
	rankItem,
	compareItems,
} from '@tanstack/match-sorter-utils';
import SearchFilter from '../SearchFilters/SearchFilter';
import { createColumnHelper } from '@tanstack/react-table';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {getPatient} from '../../../redux/Patient/patientsSlice'





type Patient = {
	ptName: String;
	ptGender: String;
};



const columnHelper = createColumnHelper<Patient>();

const columns = [
	columnHelper.accessor('ptName', {
		cell: (info) => info.getValue(),
		header: 'Patient Name',
	}),
	columnHelper.accessor('ptGender', {
		cell: (info) => info.getValue(),
		header: 'Gender',
	}),
];






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



export const DoctorTable = <Data extends object>() => {

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getPatient())
	}, [])
	const res = useAppSelector(state => state.patients.data);

	const data : Patient[] = []
	res.forEach(element => {
		const temp : Patient = {
			ptName: element.ptGivenName + " " +element.ptSurname, 
			ptGender: element.ptBirthSex, 
		}
		data.push(temp)
	})






	const rerender = React.useReducer(() => ({}), {})[1];

	const [sorting, setSorting] = React.useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
 
	const [globalFilter, setGlobalFilter] = React.useState('');

	const table = useReactTable({
		columns,
		data,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	React.useEffect(() => {
		if (table.getState().columnFilters[0]?.id === 'fullName') {
			if (table.getState().sorting[0]?.id !== 'fullName') {
				table.setSorting([{ id: 'fullName', desc: false }]);
			}
		}
	}, [table.getState().columnFilters[0]?.id]);

	return (
		<Box>
			<Flex className="w-full">
				{/* This is the Refine Search Container */}
				<SearchFilter />
			</Flex>
			<Table>
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
											{header.column.getCanFilter() ? (
												<Box className="flex justify-center items-center h-10 text-sm text-center">
													<Filter column={header.column} table={table} />
												</Box>
											) : null}
										</>
									</Th>
								);
							})}
							<Td></Td>
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
											style={{textAlign: 'center'}}
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
							<Td>
								<Button colorScheme="green">Accept</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

function Filter({
	column,
	table,
}: {
	column: Column<any, unknown>;
	table: ReactTable<any>;
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = React.useMemo(
		() => Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column.getFacetedUniqueValues()]
	);

	return (
		<>
			<datalist id={column.id + 'list'}>
				{sortedUniqueValues.slice(0, 5000).map((value: any) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebouncedInput
				type="text"
				value={(columnFilterValue ?? '') as string}
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search by ${
					column.columnDef.header == 'Languages Spoken'
						? 'Languages'
						: column.columnDef.header
				}`}
				className="pl-3 h-10 border shadow rounded"
				list={column.id + 'list'}
			/>
			<div className="h-1" />
		</>
	);
}

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default DoctorTable;




{/* <DebouncedInput
	value={globalFilter ?? ''}
	onChange={(value) => setGlobalFilter(String(value))}
	className="w-3/4 p-4 font-lg shadow border rounded-md"
	placeholder="Search doctor"
/> */}