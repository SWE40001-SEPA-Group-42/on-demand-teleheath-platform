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

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Userfront from '@userfront/react';
import { getPatient } from '../../../redux/Patient/patientsSlice';
import { Patient } from '../../../types/Patient';

Userfront.init(process.env.REACT_APP_USERFRONT_INIT);
//useFront - get the string
//redux
//action
//selector
//dispatch

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

const PatientProfileBasicDetails = () => {
  const data = useAppSelector((state) => state.patients.data[0]);

  const patient = {
    ptGivenName: data.ptGivenName,
    ptSurname: data.ptSurname,
    ptPreferredName: data.ptPreferredName,
    ptDOB: data.ptDOB,
    ptBirthSex: data.ptBirthSex,
    ptEmailAddress: data.ptEmailAddress,
    ptMobilePhone: data.ptMobilePhone,
    ptHomePhone: data.ptHomePhone,
    ptWorkPhone: data.ptWorkPhone,
    ptAddress: {
      line1: data.ptAddress.line1,
      line2: data.ptAddress.line2,
      city: data.ptAddress.city,
      state: data.ptAddress.state,
      postcode: data.ptAddress.postcode,
      country: data.ptAddress.country,
    },
    ptMedicareCardNo: data.ptMedicareCardNo,
    ptMedicareCardIRN: data.ptMedicareCardIRN,
    ptMedicareCardExpiryDate: data.ptMedicareCardExpiryDate,
    ptPrivateHealthFund: data.ptPrivateHealthFund,
    ptPrivateHealthFundNo: data.ptPrivateHealthFundNo,
    ptEmgContactGivenName: data.ptEmgContactGivenName,
    ptEmgContactSurname: data.ptEmgContactSurname,
    ptEmgContactRelationship: data.ptEmgContactRelationship,
    ptEmgContactMobilePhone: data.ptEmgContactMobilePhone,
    ptEmgContactHomePhone: data.ptEmgContactHomePhone,
    ptEmgContactWorkPhone: data.ptEmgContactWorkPhone,
    ptNextOfKinGivenName: data.ptNextOfKinGivenName,
    ptNextOfKinSurname: data.ptNextOfKinSurname,
    ptNextOfKinRelationship: data.ptNextOfKinRelationship,
    ptNextOfKinMobilePhone: data.ptNextOfKinMobilePhone,
    ptNextOfKinHomePhone: data.ptNextOfKinHomePhone,
    ptNextofKinWorkPhone: data.ptNextofKinWorkPhone,
    ptDVAFileNo: data.ptDVAFileNo,
    ptDVAExpiryDate: data.ptDVAExpiryDate,
    ptHealthcareCardNo: data.ptHealthcareCardNo,
    ptHealthcareCardExpiryDate: data.ptHealthcareCardExpiryDate,
    ptPensionCardNo: data.ptPensionCardNo,
    ptPensionCardExpiryDate: data.ptPensionCardExpiryDate,
  };

  const ptAge = calculateAge(new Date(patient.ptDOB));
  const patientAddress = [
    patient.ptAddress.line1,
    patient.ptAddress.line2,
    patient.ptAddress.city,
    patient.ptAddress.state,
    patient.ptAddress.postcode,
    patient.ptAddress.country,
  ]
    .filter(Boolean)
    .join(', ');

  const patientName = [patient.ptGivenName, patient.ptSurname].join(' ');

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
              <Avatar size="xl" name={patientName} />
            </Box>
            <Text className="text-xl font-semibold">{patientName}</Text>
          </Box>
          <SimpleGrid
            columns={[1, 1, 1, 3, 1, 3]}
            className="patient-profile-details"
          >
            <Box className="patient-profile-basic-details-1">
              <CardContent label="DOB" description={patient.ptDOB} />
            </Box>
            <Box className="card-content patient-profile-basic-details-1">
              <Text className="card-label">Age</Text>
              <Text className="card-description">
                {ptAge > 0 ? ptAge + ' years old' : ptAge + ' year old'}
              </Text>
              {/* <Moment from={currentDate}>{ptDOB}</Moment> */}
              {/* <Moment date={ptDOB} format="yy [year old]" durationFromNow /> */}
            </Box>
            <Box className="patient-profile-basic-details-1">
              <CardContent label="Birth sex" description={patient.ptBirthSex} />
            </Box>
          </SimpleGrid>
          {/* <Divider orientation="vertical" /> */}
        </Flex>
        <Box className="patient-profile-details">
          <CardContent label="Address" description={patientAddress} />
          <CardContent
            label="Email address"
            description={patient.ptEmailAddress}
          />
          <CardContent
            label="Mobile phone number"
            description={patient.ptMobilePhone}
          />
          <CardContent
            label="Home phone number"
            description={patient.ptHomePhone || ''}
          />
          <CardContent
            label="Work phone number"
            description={patient.ptWorkPhone || ''}
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

interface IPatientProfile {
  ptName: string;
  ptImgSrc: string;
}

const PatientProfile: React.FC<IPatientProfile> = ({}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPatient({
      ptGivenName: Userfront.user.data.givenName,
      ptSurname: Userfront.user.data.surName,
    }));
  }, []);

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

const PatientProfileAdditionalDetails = () => {
  const data = useAppSelector((state) => state.patients.data[0]);

  const patient = {
    ptGivenName: data.ptGivenName,
    ptSurname: data.ptSurname,
    ptPreferredName: data.ptPreferredName,
    ptDOB: data.ptDOB,
    ptBirthSex: data.ptBirthSex,
    ptEmailAddress: data.ptEmailAddress,
    ptMobilePhone: data.ptMobilePhone,
    ptHomePhone: data.ptHomePhone,
    ptWorkPhone: data.ptWorkPhone,
    ptAddress: {
      line1: data.ptAddress.line1,
      line2: data.ptAddress.line2,
      city: data.ptAddress.city,
      state: data.ptAddress.state,
      postcode: data.ptAddress.postcode,
      country: data.ptAddress.country,
    },
    ptMedicareCardNo: data.ptMedicareCardNo,
    ptMedicareCardIRN: data.ptMedicareCardIRN,
    ptMedicareCardExpiryDate: data.ptMedicareCardExpiryDate,
    ptPrivateHealthFund: data.ptPrivateHealthFund,
    ptPrivateHealthFundNo: data.ptPrivateHealthFundNo,
    ptEmgContactGivenName: data.ptEmgContactGivenName,
    ptEmgContactSurname: data.ptEmgContactSurname,
    ptEmgContactRelationship: data.ptEmgContactRelationship,
    ptEmgContactMobilePhone: data.ptEmgContactMobilePhone,
    ptEmgContactHomePhone: data.ptEmgContactHomePhone,
    ptEmgContactWorkPhone: data.ptEmgContactWorkPhone,
    ptNextOfKinGivenName: data.ptNextOfKinGivenName,
    ptNextOfKinSurname: data.ptNextOfKinSurname,
    ptNextOfKinRelationship: data.ptNextOfKinRelationship,
    ptNextOfKinMobilePhone: data.ptNextOfKinMobilePhone,
    ptNextOfKinHomePhone: data.ptNextOfKinHomePhone,
    ptNextofKinWorkPhone: data.ptNextofKinWorkPhone,
    ptDVAFileNo: data.ptDVAFileNo,
    ptDVAExpiryDate: data.ptDVAExpiryDate,
    ptHealthcareCardNo: data.ptHealthcareCardNo,
    ptHealthcareCardExpiryDate: data.ptHealthcareCardExpiryDate,
    ptPensionCardNo: data.ptPensionCardNo,
    ptPensionCardExpiryDate: data.ptPensionCardExpiryDate,
  };

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
              description={patient.ptMedicareCardNo}
            />
            <CardContent
              label="Medicare card IRN"
              description={patient.ptMedicareCardIRN || ''}
            />
            <CardContent
              label="Medicare card expiry date"
              description={patient.ptMedicareCardExpiryDate || ''}
            />
            <CardContent
              label="Private health fund name"
              description={patient.ptPrivateHealthFund || ''}
            />
            <CardContent
              label="Private health fund number"
              description={patient.ptPrivateHealthFundNo || ''}
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
                patient.ptEmgContactGivenName,
                patient.ptEmgContactSurname,
              ].join(' ')}
            />
            <CardContent
              label="Relationship"
              description={patient.ptEmgContactRelationship || ''}
            />
            <CardContent
              label="Mobile phone"
              description={patient.ptEmgContactMobilePhone || ''}
            />
            <CardContent
              label="Home phone"
              description={patient.ptEmgContactHomePhone || ''}
            />
            <CardContent
              label="Work phone"
              description={patient.ptEmgContactWorkPhone || ''}
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
                patient.ptNextOfKinGivenName,
                patient.ptNextOfKinSurname,
              ].join(' ')}
            />
            <CardContent
              label="Relationship"
              description={patient.ptNextOfKinRelationship || ''}
            />
            <CardContent
              label="Mobile phone"
              description={patient.ptNextOfKinMobilePhone || ''}
            />
            <CardContent
              label="Home phone"
              description={patient.ptNextOfKinHomePhone || ''}
            />
            <CardContent
              label="Work phone"
              description={patient.ptNextofKinWorkPhone || ''}
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
              description={patient.ptDVAFileNo || ''}
            />
            <CardContent
              label="DVA expiry date"
              description={patient.ptDVAExpiryDate || ''}
            />
            <CardContent
              label="Healthcare card number"
              description={patient.ptHealthcareCardNo || ''}
            />
            <CardContent
              label="Healthcare card expiry date"
              description={patient.ptHealthcareCardExpiryDate || ''}
            />
            <CardContent
              label="Pension card number"
              description={patient.ptPensionCardNo || ''}
            />
            <CardContent
              label="Pension card expiry date"
              description={patient.ptPensionCardExpiryDate || ''}
            />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default PatientProfile;
