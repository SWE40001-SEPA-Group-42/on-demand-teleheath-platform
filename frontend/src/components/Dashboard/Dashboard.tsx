import { Button, Text } from '@chakra-ui/react';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import PatientTable from '../Dashboard/Table/PatientTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {fetchDoctors} from '../../redux/Doctor/doctorsSlice'
import Userfront from '@userfront/react';
import { Navigate} from 'react-router-dom';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

type Doctor = {
	drName: String;
	drGender: String;
	drLanguagesSpoken: String;
	drSpecialisations: String;
};

const data: Doctor[] = [
	{
		drName: 'Peter',
		drGender: 'Male',
		drLanguagesSpoken: 'Vietnamese',
		drSpecialisations: 'Men Health',
	},
	{
		drName: 'Cath',
		drGender: 'Female',
		drLanguagesSpoken: 'English',
		drSpecialisations: 'Woman Health',
	},
	{
		drName: 'Katy',
		drGender: 'Female',
		drLanguagesSpoken: 'English',
		drSpecialisations: 'Mental Health',
	},
];

const columnHelper = createColumnHelper<Doctor>();

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
	columnHelper.accessor('drSpecialisations', {
		cell: (info) => info.getValue(),
		header: 'Specialisations',
	}),
];





const Dashboard = () => {
	// const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(fetchDoctors())
    // }, [])
    // const res = useAppSelector(state => state.doctors.data);

    // const data : Doctor[] = []
    // res.forEach(element => {
    //     const temp : Doctor = {
    //         drName: element.drGivenName + " " +element.drSurname, 
    //         drGender: element.drBirthSex, 
    //         drLanguagesSpoken: element.drLanguagesSpoken, 
    //         drSpecialisations: element.drQualifications
    //     }
    //     data.push(temp)
    // })
    // console.log(data)

	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);
	const ptName = Userfront.user.name
	const ptGivenName = ptName.substring(0, ptName.indexOf(' ')).trim()
	const ptSurname = ptName.substring(ptName.indexOf(' ')).trim()

	const [ptDetails, setPtDetails] = useState()
	

	const requestAppointment = async () => {

	}


	//Check if the user is newly signup
	if(Object.keys(Userfront.user.data).length === 0) {
		return <Navigate to='/patient/profile/add' replace /> 
	}


	console.log(Userfront.user)

	const patient = {
		imgSrc: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
		givenName: Userfront.user.data.ptGivenName,
		surname:  Userfront.user.data.ptSurname,
	};



	let patientView
	let doctorView =""
	let clinicView=""


	const patientName = [patient.givenName, patient.surname].join(' ');
	return (
		<>
			<DashboardNavbar userName={patientName} userImgSrc={patient.imgSrc} />

			{/* the Welcome, Patient Name */}
			<Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{ fontWeight: 'bold' }}>
				Welcome, {patientName}
			</Text>

			<Text fontSize="2xl" textAlign="left" pl="30px" my="30px" style={{ fontWeight: 'bold' }}>
				DASHBOARD
			</Text>


			{/* This is where the table will be generate */} 
			{patientView !== "" && <PatientTable columns={columns} data={data} />}
			{doctorView !== "" && <h1>DoctorView</h1> }
			{clinicView !== "" && <h1>ClinicView</h1>}

			{/* <PatientTable columns={columns} data={data} /> */}

			<Button onClick={requestAppointment}>Request Appointment</Button>
		</>
	);
};



export default Dashboard;
