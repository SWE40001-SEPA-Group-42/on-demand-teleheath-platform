import React, { useEffect, useState } from 'react';
import DoctorUpdateProfileForm from '../../components/Doctor/DoctorUpdateProfileForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDoctors } from '../../redux/Doctor/doctorsSlice';
import { useParams } from 'react-router-dom';

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

const DoctorDetails = () => {
	const currentDate = new Date();
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
		drAddress: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		postcode: "",
		country: "",
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

	// const id = useParams()

	return (
		doctor.drGivenName !== ""
			? <div>
				<DoctorUpdateProfileForm doctor={doctor}/>
			</div>
			: <div></div>
	);
};

export default DoctorDetails;