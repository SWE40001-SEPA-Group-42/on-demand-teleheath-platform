import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Doctor } from '../../types/Doctor';
import { Box } from '@chakra-ui/react';
import DoctorUpdateProfileForm from '../../components/Forms/Doctor/DoctorUpdateProfileForm';
import { fetchDoctor } from '../../redux/Doctor/doctorsSlice';
import Userfront from '@userfront/react';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

//USERFRONT => PASSING IN GIVEN NAME AND SURNAME
// console.log(Userfront.user)
// const doctorObj = {
// 	drGivenName: Userfront.user.data.givenName, 
// 	drSurname: Userfront.user.data.surName
// }

const DoctorUpdateProfile = () => {
	// const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	dispatch(fetchDoctor(doctorObj));
	// }, []);

	// useEffect(() => {
	// 	if (doctors.data.length > 0) {
	// 		setDoctor(doctors.data[0]);
	// 	}
	// }, []);

	// const doctors = useAppSelector((state) => state.doctors);
	// console.log(doctors);
	// const [doctor, setDoctor] = useState<Doctor>({
	// 	_id: '',
	// 	drId: '',
	// 	drGivenName: '',
	// 	drSurname: '',
	// 	drPreferredName: '',
	// 	drDOB: '',
	// 	drBirthSex: '',
	// 	drEmail: '',
	// 	drPhone: '',
	// 	drAddress: {
	// 		line1: '',
	// 		line2: '',
	// 		city: '',
	// 		state: '',
	// 		postcode: '',
	// 		country: '',
	// 	},
	// 	drCode: '',
	// 	drPrescriberNo: '',
	// 	drQualifications: '',
	// 	drLanguagesSpoken: '',
	// 	drClinicName: '',
	// });

	// return doctor.drGivenName !== '' ? (
	// 	<Box>
	// 		<DoctorUpdateProfileForm drDoctor={doctor} />
	// 	</Box>
	// ) : (
	// 	<Box>Hi there</Box>
	// );
	return (
		<h1>Hi there</h1>
	)
};

export default DoctorUpdateProfile;
