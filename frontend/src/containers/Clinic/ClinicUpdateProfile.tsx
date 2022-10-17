import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Clinic } from '../../types/Clinic';
import { Box } from '@chakra-ui/react';
import ClinicUpdateProfileForm from '../../components/Forms/Clinic/ClinicUpdateProfileForm';
import { getClinic } from '../../redux/Clinic/clinicsSlice';

const ClinicUpdateProfile = () => {
	const dispatch = useAppDispatch();
	const clinics = useAppSelector((state) => state.clinics);
	const [clinic, setClinic] = useState<Clinic>({
		_id: '',
		clName: '',
		clAddress: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
		},
		clEmailAddress: '',
		clPhone: '',
		clUrl: '',
	});

	useEffect(() => {
		dispatch(getClinic('Burwood Hospital'));
	}, []);

	useEffect(() => {
		if (clinics.data.length > 0) {
			setClinic(clinics.data[0]);
		}
	}, [clinics]);

	return clinic.clName !== '' ? (
		<Box>
			<ClinicUpdateProfileForm clinic={clinic} />
		</Box>
	) : (
		<></>
	);
};

export default ClinicUpdateProfile;
