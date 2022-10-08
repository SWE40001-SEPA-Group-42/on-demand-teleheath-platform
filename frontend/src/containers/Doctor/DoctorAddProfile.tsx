import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice'

import DoctorAddProfileForm from '../../components/Doctor/DoctorAddProfileForm'

type Doctor = {
	_id: string,
	drGivenName: string,
	drSurname: string,
	drPreferredName: string
	drDOB: string,
	drBirthSex: string,
	drEmail: string,
	drPhone: string,
	drAddress: string,
	line1: string,
	line2: string,
	city: string,
	state: string,
	postcode: string,
	country: string
	drCode: string,
	drPrescriberNo: string,
	drQualifications: string,
	drLanguagesSpoken: string,
	drClinicName: string
}

const DoctorAddProfile = () => {
	const currentDate = new Date();

	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)

	const [user, setUser] = useState({
		id: 'id'
	})

	return (
		user.id !== ''
		? <div>
			<DoctorAddProfileForm/>
		</div>
		: <div></div>
	);
};

export default DoctorAddProfile;
