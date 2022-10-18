import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Box } from '@chakra-ui/react';
import DoctorAddProfileForm from '../../components/Forms/Doctor/DoctorAddProfileForm';

const DoctorAddProfile = () => {
	const currentDate = new Date();

	const dispatch = useAppDispatch();
	const doctors = useAppSelector((state) => state.doctors);

	const [user, setUser] = useState({
		id: 'id',
	});

	return user.id !== '' ? (
		<Box>
			<DoctorAddProfileForm />
		</Box>
	) : (
		<Box></Box>
	);
};

export default DoctorAddProfile;
