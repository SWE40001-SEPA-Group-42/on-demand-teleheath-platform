import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Patient } from '../../types/Patient';
import { Box } from '@chakra-ui/react';
import PatientUpdateProfileForm from '../../components/Forms/Patient/PatientUpdateProfileForm';
import { getPatient } from '../../redux/Patient/patientsSlice';

const PatientUpdateProfile = () => {
	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);

	const [patient, setPatient] = useState<Patient>({
		_id: '',
		ptGivenName: '',
		ptSurname: '',
		ptPreferredName: '',
		ptDOB: '',
		ptBirthSex: '',
		ptEmailAddress: '',
		ptMobilePhone: '',
		ptHomePhone: '',
		ptWorkPhone: '',
		ptAddress: {
			line1: '',
			line2: '',
			city: '',
			state: '',
			postcode: '',
			country: '',
		},
		ptMedicareCardNo: '',
		ptMedicareCardIRN: '',
		ptMedicareCardExpiryDate: '',
		ptPrivateHealthFund: '',
		ptPrivateHealthFundNo: '',
		ptEmgContactGivenName: '',
		ptEmgContactSurname: '',
		ptEmgContactRelationship: '',
		ptEmgContactMobilePhone: '',
		ptEmgContactHomePhone: '',
		ptEmgContactWorkPhone: '',
		ptNextOfKinGivenName: '',
		ptNextOfKinSurname: '',
		ptNextOfKinRelationship: '',
		ptNextOfKinMobilePhone: '',
		ptNextOfKinHomePhone: '',
		ptNextofKinWorkPhone: '',
		ptDVAFileNo: '',
		ptDVAExpiryDate: '',
		ptHealthcareCardNo: '',
		ptHealthcareCardExpiryDate: '',
		ptPensionCardNo: '',
		ptPensionCardExpiryDate: '',
	});

	useEffect(() => {
		dispatch(getPatient());
	}, []);

	useEffect(() => {
		if (patients.data.length > 0) {
			setPatient(patients.data[0]);
		}
	}, [patients]);

	console.log('Patient', patient);

	return patient.ptGivenName !== '' ? (
		<Box>
			<PatientUpdateProfileForm ptPatient={patient} />
		</Box>
	) : (
		<></>
	);
};

export default PatientUpdateProfile;
