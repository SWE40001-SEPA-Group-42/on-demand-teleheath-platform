import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-duration-format';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Link,
	SimpleGrid,
	Spacer,
	Text,
} from '@chakra-ui/react';
import CardContent from './CardContent';
import { Link as ReachLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const currentDate = new Date();
const dob = '23/10/1999';
const [day, month, year] = dob.split('/');
const ptDOB = new Date(+year, +month - 1, +day);
moment.relativeTimeThreshold('M', 12);

const calculateAge = (dob: Date) => {
	const currentDate = new Date();
	console.log("Today's date: " + currentDate.toLocaleDateString());
	console.log("Patient's date of birth: " + dob.toLocaleDateString());
	var age = currentDate.getFullYear() - dob.getFullYear();
	console.log('Age: ' + age);
	const monthDifference = currentDate.getMonth() - dob.getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 && currentDate.getDate() < dob.getDate())
	) {
		age--;
	}
	console.log(age);
	// console.log(moment.duration(123, "months").format());
	return age;
};

const patient = {
	imgSrc:
		'https://images.unsplash.com/photo-1542740348-39501cd6e2b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
	givenName: 'Emily',
	surname: 'Cooper',
	preferredName: 'Emily Cooper',
	dob: ptDOB.toLocaleDateString(),
	age: calculateAge(ptDOB),
	birthSex: 'Female',
	emailAddress: 'emily.cooper@mail.com',
	mobilePhone: '+61 412 345 678',
	homePhone: '+61 423 456 789',
	workPhone: '+61 434 567 890',
	address: {
		line1: '1 Flinders Street',
		line2: '',
		city: 'Melbourne',
		state: 'Victoria',
		postcode: '3000',
		country: 'Australia',
	},
	medicareCardNo: '1234567890',
	medicareCardIRN: '2',
	medicareCardExpiryDate: '05/2025',
	privateHealthFund: 'NIB',
	privateHealthFundNo: '2345678901',
	emgContactGivenName: 'Joyce',
	emgContactSurname: 'Bryers',
	emgContactRelationship: 'Friend',
	emgContactMobilePhone: '+61 423 456 789',
	emgContactHomePhone: '+61 345 678 901',
	emgContactWorkPhone: '+61 356 789 012',
	nextOfKinGivenName: 'Sheldon',
	nextOfKinSurname: 'Cooper',
	nextOfKinRelationship: 'Sibling',
	nextOfKinMobilePhone: '+61 434 567 890',
	nextOfKinHomePhone: '+61 367 890 123',
	nextOfKinWorkPhone: '+61 378 901 234',
	dVAFileNo: '3456789012',
	dVAExpiryDate: '07/2027',
	healthcareCardNo: '4567890123',
	healthcareCardExpiryDate: '09/2023',
	pensionCardNo: '5678901234',
	pensionCardExpiryDate: '04/2024',
};

const PatientProfileBasicDetails = () => {
	const patientAddress = [
		patient.address.line1,
		patient.address.line2,
		patient.address.city,
		patient.address.state,
		patient.address.postcode,
		patient.address.country,
	]
		.filter(Boolean)
		.join(', ');

	const patientName = [patient.givenName, patient.surname].join(' ');

	return (
		<Box className="patient-profile-container card-container patient-profile-details-card">
			<SimpleGrid columns={[1, 1, 1, 1, 2]}>
				<Flex
					direction="column"
					align="center"
					justify="center"
					alignItems="center"
				>
					<Box className="text-center">
						<Box className="py-3">
							<Avatar size="xl" name={patientName} src={patient.imgSrc} />
						</Box>
						<Text className="text-xl font-semibold">{patientName}</Text>
					</Box>
					<SimpleGrid
						columns={[1, 1, 1, 3, 1, 3]}
						className="patient-profile-details"
					>
						<Box className="patient-profile-basic-details-1">
							<CardContent label="DOB" description={patient.dob} />
						</Box>
						<Box className="card-content patient-profile-basic-details-1">
							<Text className="card-label">Age</Text>
							<Text className="card-description">
								{patient.age > 0
									? patient.age + ' years old'
									: patient.age + ' year old'}
							</Text>
							{/* <Moment from={currentDate}>{ptDOB}</Moment> */}
							{/* <Moment date={ptDOB} format="yy [year old]" durationFromNow /> */}
						</Box>
						<Box className="patient-profile-basic-details-1">
							<CardContent label="Birth sex" description={patient.birthSex} />
						</Box>
					</SimpleGrid>
					{/* <Divider orientation="vertical" /> */}
				</Flex>
				<Box className="patient-profile-details">
					<CardContent label="Address" description={patientAddress} />
					<CardContent
						label="Email address"
						description={patient.emailAddress}
					/>
					<CardContent
						label="Mobile phone number"
						description={patient.mobilePhone}
					/>
					<CardContent
						label="Home phone number"
						description={patient.homePhone}
					/>
					<CardContent
						label="Work phone number"
						description={patient.workPhone}
					/>
				</Box>
				<Link as={ReachLink} to="/update">
					<Box className="button-container">
						<Button
							className="edit-profile-button"
							colorScheme="blue"
							rightIcon={<FaEdit />}
						>
							Edit Profile
						</Button>
					</Box>
				</Link>
			</SimpleGrid>
		</Box>
	);
};

const PatientProfileAdditionalDetails = () => {
	return (
		<Box className="patient-profile-container">
			<SimpleGrid columns={[1, 1, 1, 1, 1, 2]} spacing={10}>
				<Box className="card-container patient-profile-details-card">
					<Box className="text-center">
						<Heading as="h1" size="md" py={4}>
							Medicare and private health insurance
						</Heading>
						<Divider orientation="horizontal" />
					</Box>
					<Box className="py-4">
						<CardContent
							label="Medicare card number"
							description={patient.medicareCardNo}
						/>
						<CardContent
							label="Medicare card IRN"
							description={patient.medicareCardIRN}
						/>
						<CardContent
							label="Medicare card expiry date"
							description={patient.medicareCardExpiryDate}
						/>
						<CardContent
							label="Private health fund name"
							description={patient.privateHealthFund}
						/>
						<CardContent
							label="Private health fund number"
							description={patient.privateHealthFundNo}
						/>
					</Box>
				</Box>
				<Box className="card-container patient-profile-details-card">
					<Box className="text-center">
						<Heading as="h1" size="md" py={4}>
							Emergency contact
						</Heading>
						<Divider orientation="horizontal" />
					</Box>
					<Box className="py-4">
						<CardContent
							label="Name"
							description={[
								patient.emgContactGivenName,
								patient.emgContactSurname,
							].join(' ')}
						/>
						<CardContent
							label="Relationship"
							description={patient.emgContactRelationship}
						/>
						<CardContent
							label="Mobile phone"
							description={patient.emgContactMobilePhone}
						/>
						<CardContent
							label="Home phone"
							description={patient.emgContactHomePhone}
						/>
						<CardContent
							label="Work phone"
							description={patient.emgContactWorkPhone}
						/>
					</Box>
				</Box>
				<Box className="card-container patient-profile-details-card">
					<Box className="text-center">
						<Heading as="h1" size="md" py={4}>
							Next of kin
						</Heading>
						<Divider orientation="horizontal" />
					</Box>
					<Box className="py-4">
						<CardContent
							label="Name"
							description={[
								patient.nextOfKinGivenName,
								patient.nextOfKinSurname,
							].join(' ')}
						/>
						<CardContent
							label="Relationship"
							description={patient.nextOfKinRelationship}
						/>
						<CardContent
							label="Mobile phone"
							description={patient.nextOfKinMobilePhone}
						/>
						<CardContent
							label="Home phone"
							description={patient.nextOfKinHomePhone}
						/>
						<CardContent
							label="Work phone"
							description={patient.nextOfKinWorkPhone}
						/>
					</Box>
				</Box>
				<Box className="card-container patient-profile-details-card">
					<Box className="text-center">
						<Heading as="h1" size="md" py={4}>
							DVA, healthcare and pension cards
						</Heading>
						<Divider orientation="horizontal" />
					</Box>
					<Box className="py-4">
						<CardContent
							label="DVA file number"
							description={patient.dVAFileNo}
						/>
						<CardContent
							label="DVA expiry date"
							description={patient.dVAExpiryDate}
						/>
						<CardContent
							label="Healthcare card number"
							description={patient.healthcareCardNo}
						/>
						<CardContent
							label="Healthcare card expiry date"
							description={patient.healthcareCardExpiryDate}
						/>
						<CardContent
							label="Pension card number"
							description={patient.pensionCardNo}
						/>
						<CardContent
							label="Pension card expiry date"
							description={patient.pensionCardExpiryDate}
						/>
					</Box>
				</Box>
			</SimpleGrid>
		</Box>
	);
};

interface IPatientProfile {
	ptName: string;
	ptImgSrc: string;
}

const PatientProfile: React.FC<IPatientProfile> = ({}) => {
	return (
		<Box className="w-screen">
			<Box>
				<Heading as="h1" size="lg" className="text-center py-10">
					My Profile
				</Heading>
			</Box>
			<PatientProfileBasicDetails />
			<PatientProfileAdditionalDetails />
		</Box>
	);
};

export default PatientProfile;
