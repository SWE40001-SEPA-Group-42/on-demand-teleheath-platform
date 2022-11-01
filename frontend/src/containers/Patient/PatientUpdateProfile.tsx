import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Patient } from '../../types/Patient';
import { Box } from '@chakra-ui/react';
import PatientUpdateProfileForm from '../../components/Forms/Patient/PatientUpdateProfileForm';
import { getPatient } from '../../redux/Patient/patientsSlice';
import Userfront from '@userfront/react';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);

const PatientUpdateProfile = () => {
	const dispatch = useAppDispatch();
	const patients = useAppSelector((state) => state.patients);
	const patientName = Userfront.user.name
	const ptGivenName = patientName.substring(0, patientName.indexOf(' ')).trim()
	const ptSurname = patientName.substring(patientName.indexOf(' ')).trim()
	console.log(ptGivenName)
	console.log(ptSurname)
	//Change from get by name to get by ID later

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
		dispatch(getPatient({
			ptGivenName: ptGivenName,
			ptSurname: ptSurname
		}));
	}, []);

	useEffect(() => {
		if (patients.data.length > 0) {
			setPatient(patients.data[0]);
		}
	}, [patients]);

	// console.log('Patient', patient);

	return patient.ptGivenName !== '' ? (
		<Box>
			<PatientUpdateProfileForm ptPatient={patient} />
		</Box>
	) : (
		<></>
	);
};

export default PatientUpdateProfile;
