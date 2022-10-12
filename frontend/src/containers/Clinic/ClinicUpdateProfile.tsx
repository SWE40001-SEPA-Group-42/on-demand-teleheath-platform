import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Clinic } from '../../types/Clinic';
import ClinicUpdateProfile from '../../components/Clinic/ClinicUpdateProfile';
import { getClinic } from '../../redux/Clinic/clinicsSlice';

const ClinicForm = () => {
	const currentDate = new Date();
	const dispatch = useAppDispatch()
	const clinics = useAppSelector(state => state.clinics)
	const [clinic, setClinic] = useState<Clinic>({
		_id: "",
		clName: "",
		clAddress: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postcode: "",
			country: ""
		},
		clPhone: "",
		clEmailAddress: ""
	})

	useEffect(() => {
		dispatch(getClinic("Burwood Hospital"))
	}, [])

	useEffect(() => {
		if (clinics.data.length > 0) {
			setClinic(clinics.data[0])
		}
	}, [clinics])

	return (
		clinic.clName !== ""
			? <div>
				<ClinicUpdateProfile clinic={clinic} />
			</div> : <></>
	)
};

export default ClinicForm;
