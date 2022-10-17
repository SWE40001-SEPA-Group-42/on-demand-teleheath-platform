import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Doctor } from '../../types/Doctor';
import { Box } from '@chakra-ui/react';
import DoctorUpdateProfileForm from '../../components/Forms/Doctor/DoctorUpdateProfileForm';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice';

const DoctorUpdateProfile = () => {
	const dispatch = useAppDispatch();
	const doctors = useAppSelector((state) => state.doctors);
	const [doctor, setDoctor] = useState<Doctor>({
		_id: '',
		drGivenName: '',
		drSurname: '',
		drPreferredName: '',
		drDOB: '',
		drBirthSex: '',
		drEmail: '',
		drPhone: '',
		drAddress: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
		},
		drCode: '',
		drPrescriberNo: '',
		drQualifications: '',
		drLanguagesSpoken: '',
		drClinicName: '',
	});

	useEffect(() => {
		dispatch(fetchDoctors());
	}, []);

	useEffect(() => {
		if (doctors.data.length > 0) {
			setDoctor(doctors.data[0]);
		}
	}, [doctors]);

	console.log(doctor);

	return doctor.drGivenName !== '' ? (
		<Box>
			<DoctorUpdateProfileForm drDoctor={doctor} />
		</Box>
	) : (
		<Box></Box>
	);
};

export default DoctorUpdateProfile;
