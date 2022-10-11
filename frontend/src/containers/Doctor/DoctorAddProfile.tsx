import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DoctorAddProfileForm from '../../components/Doctor/DoctorAddProfileForm'

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
