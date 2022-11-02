import React, { FormEvent, useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { fetchDoctor, fetchDoctors } from '../../../redux/Doctor/doctorsSlice'
import { createAppointment } from '../../../redux/Appointment/appointmentsSlice'
import Userfront from '@userfront/react';
import { getPatient } from '../../../redux/Patient/patientsSlice';
import { Patient } from '../../../types/Patient';
import { v1 as uuid } from "uuid";

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

type DoctorData = {
	userId: string,
	drName: string,
	drGender: string,
	drLanguagesSpoken: string,
	drQualifications: string
}

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

const columnHelper = createColumnHelper<DoctorData>();

const columns = [
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
	columnHelper.accessor('drQualifications', {
		cell: (info) => info.getValue(),
		header: 'Specialisations',
	}),
];

//MAIN COMPONENT
export const PatientTable = <Data extends object>() => {

	const dispatch = useAppDispatch();
	const doctors = useAppSelector(state => state.doctors);
	const patients = useAppSelector(state => state.patients)
	const appointments = useAppSelector(state => state.appointments)
	const [patient, setPatient] = useState<Patient>()
	const [data, setData] = useState<DoctorData[]>([])

	useEffect(() => {
		dispatch(fetchDoctors())
		dispatch(getPatient({
			ptGivenName: Userfront.user.data.givenName,
			ptSurname: Userfront.user.data.surname
		}))
	}, [])

	useEffect(() => {
		setPatient(patients.data[0])
	}, [patients.data])

	useEffect(() => {
		setData([])
		doctors.data.forEach(e => {
			const temp: DoctorData = {
				userId: e.userId || "",
				drName: e.drGivenName + " " + e.drSurname,
				drGender: e.drBirthSex,
				drLanguagesSpoken: e.drLanguagesSpoken,
				drQualifications: e.drQualifications
			}
			setData(prev => [...prev, temp])
		})
	}, [doctors.data])

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


	//request appoinment
	const requestAppointment = async (drName: string) => {
		let tempArr = drName.split(" ")
		const drGivenName = tempArr[0]
		const drSurname = tempArr[1]

		const doctorToRequest = doctors.data.filter(e => e.drGivenName === drGivenName && e.drSurname === drSurname)[0]
		console.log(doctorToRequest)

		if (patient) {
			const id = uuid()
			await dispatch(createAppointment({
				ptEmail: patient.ptEmailAddress,
				drEmail: doctorToRequest.drEmail,
				aptLink: id
			}))

			console.log(appointments.data[0])
		}
	}

	return (
		<Box mb='100px'>
			<Flex className="w-full">
				{/* <DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					className="w-3/4 p-4 font-lg shadow border rounded-md"
					placeholder="Search doctor"
				/> */}

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
								// console.log(row.original.userId)
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
							<Td>
								<Button onClick={() => {
									requestAppointment(row.original.drName)
								}} colorScheme="green">Request</Button>
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
				placeholder={`Search by ${column.columnDef.header == 'Languages Spoken'
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

export default PatientTable;