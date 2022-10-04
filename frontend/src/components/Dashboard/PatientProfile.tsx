import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-duration-format';
import {
	Avatar,
	Box,
	Heading,
	IconButton,
	Link,
	HStack,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import FeatureCardContent from '../Dashboard/FeatureCardContent';
import { Link as ReachLink } from 'react-router-dom';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';

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
	age: calculateAge(ptDOB).toString(),
	birthSex: 'Female',
	emailAddress: 'emily.cooper@mail.com',
	mobilePhone: '+61 412 345 678',
	homePhone: '',
	workPhone: '',
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

interface IPatientProfileBasicDetails {}

const PatientProfileBasicDetails: React.FC<
	IPatientProfileBasicDetails
> = () => {
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
		<Box className="card-container">
			<HStack divider={<StackDivider borderColor="gray.200" />}>
				<Box className="w-2/5">
					<VStack className="flex justify-center text-center">
						<Avatar
							size="md"
							name={patientName}
							src={patient.imgSrc}
						/>
						<Text size="lg" fontWeight="600">
							{patientName}
						</Text>
					</VStack>
					<SimpleGrid columns={3} spacing={10}>
						<Box>
							<Text size="md" fontWeight="600">
								DOB
							</Text>
							<Text>{patient.dob}</Text>
						</Box>
						<Box>
							<Text size="md" fontWeight="600">
								Age
							</Text>
							{/* <Text>{patient.age}</Text> */}
							{/* <Moment from={currentDate}>{ptDOB}</Moment> */}
							<Moment date={ptDOB} format="yy [year old]" durationFromNow />
						</Box>
						<Box>
							<Text size="md" fontWeight="600">
								Birth Sex
							</Text>
							<Text>{patient.birthSex}</Text>
						</Box>
					</SimpleGrid>
				</Box>
				<Box className="w-3/5">
					<VStack align="flex-start" className="text-left">
						
						<Box py={2}>
							<Text size="md" fontWeight="600" color="gray.600">
								Address
							</Text>
							<Text>{patientAddress}</Text>
						</Box>
						<Box py={2}>
							<Text size="md" fontWeight="600" color="gray.600">
								Email address
							</Text>
							<Text>{patient.emailAddress}</Text>
						</Box>
						<Box py={2}>
							<Text size="md" fontWeight="600" color="gray.600">
								Mobile number
							</Text>
							<Text>{patient.mobilePhone}</Text>
						</Box>
					</VStack>
				</Box>
			</HStack>
		</Box>
	);
};

interface IPatientProfileAdditionalDetails {}

const PatientProfileAdditionalDetails: React.FC<
	IPatientProfileAdditionalDetails
> = () => {
	return (
		<Box className="card-container">
			<VStack
				className="text-left"
				divider={<StackDivider borderColor="gray.200" />}
			>
				<HStack>
					<Text className="text-md">Additional details</Text>
					<IconButton
						aria-label="Edit Profile"
						size="md"
						variant="unstyled"
						icon={<FaEdit />}
					></IconButton>
				</HStack>
				<VStack align="flex-start ">
					<Heading as="h1" className="text-md" py={4}>
						Medicare and private health insurance
					</Heading>
					<FeatureCardContent
						label="Medicare card number"
						description={patient.medicareCardNo}
					/>
					<FeatureCardContent
						label="Medicare card IRN"
						description={patient.medicareCardIRN}
					/>
					<FeatureCardContent
						label="Medicare card expiry date"
						description={patient.medicareCardExpiryDate}
					/>
					<FeatureCardContent
						label="Private health fund name"
						description={patient.privateHealthFund}
					/>
					<FeatureCardContent
						label="Private health fund number"
						description={patient.privateHealthFundNo}
					/>
					<Heading as="h1" className="text-md" py={4}>
						Emergency contact
					</Heading>
					<FeatureCardContent
						label="Name"
						description={[patient.emgContactGivenName, patient.emgContactSurname].join(' ')
						}
					/>
					<FeatureCardContent
						label="Relationship"
						description={patient.emgContactRelationship}
					/>
					<FeatureCardContent
						label="Mobile phone"
						description={patient.emgContactMobilePhone}
					/>
					<FeatureCardContent
						label="Home phone"
						description={patient.emgContactHomePhone}
					/>
					<FeatureCardContent
						label="Work phone"
						description={patient.emgContactWorkPhone}
					/>
					<Heading as="h1" className="text-md" py={4}>
						Next of kin
					</Heading>
					<FeatureCardContent
						label="Name"
						description={
							[patient.nextOfKinGivenName, patient.nextOfKinSurname].join(' ')
						}
					/>
					<FeatureCardContent
						label="Relationship"
						description={patient.nextOfKinRelationship}
					/>
					<FeatureCardContent
						label="Mobile phone"
						description={patient.nextOfKinMobilePhone}
					/>
					<FeatureCardContent
						label="Home phone"
						description={patient.nextOfKinHomePhone}
					/>
					<FeatureCardContent
						label="Work phone"
						description={patient.nextOfKinWorkPhone}
					/>
					<Heading as="h1" size="md" py={4}>
						DVA, healthcare and pension cards
					</Heading>
					<FeatureCardContent
						label="DVA file number"
						description={patient.dVAFileNo}
					/>
					<FeatureCardContent
						label="DVA expiry date"
						description={patient.dVAExpiryDate}
					/>
					<FeatureCardContent
						label="Healthcare card number"
						description={patient.healthcareCardNo}
					/>
					<FeatureCardContent
						label="Healthcare card expiry date"
						description={patient.healthcareCardExpiryDate}
					/>
					<FeatureCardContent
						label="Pension card number"
						description={patient.pensionCardNo}
					/>
					<FeatureCardContent
						label="Pension card expiry date"
						description={patient.pensionCardExpiryDate}
					/>
				</VStack>
			</VStack>
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
			<Heading as="h1" className="text-lg text-center">
				My Profile
			</Heading>
			<PatientProfileBasicDetails />
			<PatientProfileAdditionalDetails />
		</Box>
	);
};

export default PatientProfile;
