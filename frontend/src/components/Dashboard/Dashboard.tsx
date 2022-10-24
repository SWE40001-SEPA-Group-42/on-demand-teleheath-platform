import { Text , Box} from '@chakra-ui/react';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import PatientTable from '../Dashboard/Table/PatientTable';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {fetchDoctors} from '../../redux/Doctor/doctorsSlice'
import Userfront from '@userfront/react';
import { Navigate} from 'react-router-dom';
import DoctorTable from './Table/DoctorTable'

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);





const Dashboard = () => {

	//Check if the user signs up using UserFront Default sign up form
	if(Object.keys(Userfront.user.data).length === 0) {
		return <Navigate to='/patient/profile/add' replace /> 
	}




	const user = {
		imgSrc: 'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
		givenName: Userfront.user.data.givenName,
		surname:  Userfront.user.data.surName,
	};





	const userName = [user.givenName, user.surname].join(' ');
	return (
		<>
			{/* Navigation bar */}
			<DashboardNavbar userName={userName} userImgSrc={user.imgSrc} />

			{/* The Welcome, Patient Name */}
		
		<Box background='#e7effd'>
			<Text fontSize="2xl" textAlign="left"  style={{ fontWeight: 'bold' }} color='#575757' pl='45px' >
				Welcome, {userName}
			</Text>
			<Box width='90%' mx='auto' height='wrap-content' borderRadius='7px' boxShadow='md' pb='100px' background='#FFFFFF' >
				<Text fontSize="2xl" textAlign="left" my="30px" style={{ fontWeight: 'bold' }} pl='20px' pt='20px' color='#575757'>
					Dashboard
				</Text>

				<Box w='90%' mx='auto'>
				{/* Customised table */}
					{Userfront.user.hasRole("viewer") === true && <PatientTable /> }
					{Userfront.user.hasRole("member") === true && <DoctorTable />}
					{Userfront.user.hasRole("admin") === true && <h1>ClinicView</h1>}
				</Box>
			</Box>
		</Box>
		</>
	);
};



export default Dashboard;



//STUFF NEEDED TO BE FIXED
//IDEALLY DISPATCHING THE COMPONENT BASED ON THE GENERATED => SAVING RESOURCES



//<PatientTable columns={columns} data={data}


// type Doctor = {
// 	drName: String;
// 	drGender: String;
// 	drLanguagesSpoken: String;
// 	drSpecialisations: String;
// };

// const data: Doctor[] = [
// 	{
// 		drName: 'Peter',
// 		drGender: 'Male',
// 		drLanguagesSpoken: 'Vietnamese',
// 		drSpecialisations: 'Men Health',
// 	},
// 	{
// 		drName: 'Cath',
// 		drGender: 'Female',
// 		drLanguagesSpoken: 'English',
// 		drSpecialisations: 'Woman Health',
// 	},
// 	{
// 		drName: 'Katy',
// 		drGender: 'Female',
// 		drLanguagesSpoken: 'English',
// 		drSpecialisations: 'Mental Health',
// 	},
// ];

// const columnHelper = createColumnHelper<Doctor>();

// const columns = [
// 	columnHelper.accessor('drName', {
// 		cell: (info) => info.getValue(),
// 		header: 'Doctor Name',
// 	}),
// 	columnHelper.accessor('drGender', {
// 		cell: (info) => info.getValue(),
// 		header: 'Gender',
// 	}),
// 	columnHelper.accessor('drLanguagesSpoken', {
// 		cell: (info) => info.getValue(),
// 		header: 'Languages Spoken',
// 	}),
// 	columnHelper.accessor('drSpecialisations', {
// 		cell: (info) => info.getValue(),
// 		header: 'Specialisations',
// 	}),
// ];



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