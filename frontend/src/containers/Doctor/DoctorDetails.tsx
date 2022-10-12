import { useEffect, useState } from 'react';
import DoctorUpdateProfileForm from '../../components/Doctor/DoctorUpdateProfileForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice';
import { Doctor } from '../../types/Doctor';

const DoctorDetails = () => {
	const dispatch = useAppDispatch()
	const doctors = useAppSelector(state => state.doctors)
	const [doctor, setDoctor] = useState<Doctor>({
		_id: "",
		drGivenName: "",
		drSurname: "",
		drPreferredName: "",
		drDOB: "",
		drBirthSex: "",
		drEmail: "",
		drPhone: "",
		drAddress: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postcode: "",
			country: ""
		},
		drCode: "",
		drPrescriberNo: "",
		drQualifications: "",
		drLanguagesSpoken: "",
		drClinicName: ""
	})

	useEffect(() => {
		dispatch(fetchDoctors())
	}, [])

	useEffect(() => {
		if (doctors.data.length > 0) {
			setDoctor(doctors.data[0])
		}
	}, [doctors])

	console.log(doctor)

	return (
		doctor.drGivenName !== ""
			? <div>
				<DoctorUpdateProfileForm doctor={doctor}/>
			</div>
			: <div></div>
	);
};

export default DoctorDetails;