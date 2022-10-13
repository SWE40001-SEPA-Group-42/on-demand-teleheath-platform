import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PatientUpdateProfile from '../../components/Patient/PatientUpdateProfile'
import { Patient } from '../../types/Patient';
import { getPatient } from '../../redux/Patient/patientsSlice';


const PatientDetailsForm = () => {
	const dispatch = useAppDispatch()
	const patients = useAppSelector(state => state.patients)

	const [patient, setPatient] = useState<Patient>({
		_id: "",
		ptGivenName: "",
		ptSurname: "",
		ptPreferredName: "",
		ptDOB: "",
		ptBirthSex: "",
		ptEmailAddress: "",
		ptMobilePhone: "",
		ptHomePhone: "",
		ptWorkPhone: "",
		ptAddress: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postcode: "",
			country: "",
		},
		ptMedicareCardNo: "",
		ptMedicareCardIRN: "",
		ptMedicareCardExpiryDate: "",
		ptPrivateHealthFund: "",
		ptPrivateHealthFundNo: "",
		ptEmgContactGivenName: "",
		ptEmgContactSurname: "",
		ptEmgContactRelationship: "",
		ptEmgContactMobilePhone: "",
		ptEmgContactHomePhone: "",
		ptEmgContactWorkPhone: "",
		ptNextOfKinGivenName: "",
		ptNextOfKinSurname: "",
		ptNextOfKinRelationship: "",
		ptNextOfKinMobilePhone: "",
		ptNextOfKinHomePhone: "",
		ptNextofKinWorkPhone: "",
		ptDVAFileNo: "",
		ptDVAExpiryDate: "",
		ptHealthcareCardNo: "",
		ptHealthcareCardExpiryDate: "",
		ptPensionCardNo: "",
		ptPensionCardExpiryDate: ""
	})

	useEffect(() => {
		dispatch(getPatient())
	}, [])

	useEffect(() => {
		if (patients.data.length > 0) {
			setPatient(patients.data[0])
		}
	}, [patients])

	console.log('Patient', patient)

	return (
		patient.ptGivenName !== "" ?
		<div>
			<PatientUpdateProfile patient={patient}/>
		</div> : <></>
	);
};

export default PatientDetailsForm;
