const Clinic = require("../models/clinic");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

// Mock Clinic Data
const mockClinic = new Clinic({
  clName: "testClinic",
  clAddress: {
    line1: "123 Test St",
    line2: "345 Test Ln",
    city: "Melbourne",
    state: "VIC",
    postcode: "4578",
    country: "Australia",
  },
  clPhone: "0358857621",
  clEmailAddress: "testClinic@test.com",
});

const mockInvalidClinic = new Clinic({
  clName: "testClinic",
  clAddress: {
    line1: "",
    line2: "345 Test Ln",
    city: "",
    state: "",
    postcode: 1234,
    country: "",
  },
  clPhone: "",
  clEmailAddress: "",
});

// Mock Patient Data
const mockPatient = new Patient({
  ptGivenName: "Eddard",
  ptSurname: "Stark",
  ptPreferredName: "Ned",
  ptDOB: "2003-01-01",
  ptBirthSex: "Male",
  ptEmailAddress: "e.stark@gmail.com",
  ptMobilePhone: "0456744241",
  ptHomePhone: "",
  ptWorkPhone: "",
  ptAddress: {
    line1: "123 Winter Lane",
    line2: "",
    city: "Northcote",
    state: "VIC",
    postcode: "4573",
    country: "Australia",
  },
  ptMedicareCardNo: "12345678",
  ptMedicareCardIRN: "3",
  ptMedicareCardExpiryDate: "2023-05-10",
  ptPrivateHealthFund: "Medibank",
  ptPrivateHealthFundNo: "12345678",
  ptEmgContactGivenName: "Catelyn",
  ptEmgContactSurname: "Stark",
  ptEmgContactRelationship: "Wife",
  ptEmgContactMobilePhone: "0456744999",
  ptEmgContactHomePhone: "",
  ptEmgContactWorkPhone: "",
  ptNextOfKinGivenName: "",
  ptNextOfKinSurname: "",
  ptNextOfKinRelationship: "",
  ptNextOfKinMobilePhone: "",
  ptNextOfKinHomePhone: "",
  ptNextofKinWorkPhone: "",
  ptDVAFileNo: "12345678",
  ptDVAExpiryDate: "2023-05-10",
  ptHealthcareCardNo: "12345678",
  ptHealthcareCardExpiryDate: "2023-05-10",
  ptPensionCardNo: "12345678",
  ptPensionCardExpiryDate: "2023-05-10",
});

const mockInvalidPatient = new Patient({
  ptGivenName: "Eddard",
  ptSurname: "Stark",
  ptPreferredName: "Ned",
  ptDOB: "",
  ptBirthSex: "Male",
  ptEmailAddress: "e.@stark@gmail.com",
  ptMobilePhone: "",
  ptHomePhone: "",
  ptWorkPhone: "",
  ptAddress: {
    line1: "",
    line2: "",
    city: "",
    state: "VIC",
    postcode: "",
    country: "",
  },
  ptMedicareCardNo: 1234556,
  ptMedicareCardIRN: 3,
  ptMedicareCardExpiryDate: "2023-05-10",
  ptPrivateHealthFund: "Medibank",
  ptPrivateHealthFundNo: 1234556,
  ptEmgContactGivenName: "",
  ptEmgContactSurname: "",
  ptEmgContactRelationship: "",
  ptEmgContactMobilePhone: 4456744,
  ptEmgContactHomePhone: "",
  ptEmgContactWorkPhone: "",
  ptNextOfKinGivenName: "",
  ptNextOfKinSurname: "",
  ptNextOfKinRelationship: "",
  ptNextOfKinMobilePhone: "",
  ptNextOfKinHomePhone: "",
  ptNextofKinWorkPhone: "",
  ptDVAFileNo: 1234556,
  ptDVAExpiryDate: "2023-05-10",
  ptHealthcareCardNo: 1234556,
  ptHealthcareCardExpiryDate: "2023-05-10",
  ptPensionCardNo: 1234556,
  ptPensionCardExpiryDate: "2023-05-10",
});

//Mock Doctor Data
const mockDoctor = new Doctor({
  drGivenName: "Timothy",
  drSurname: "Limmen",
  drPreferredName: "Tim",
  drDOB: "1992-01-01",
  drBirthSex: "Male",
  drEmail: "tim_limmen@gmail.com",
  drPhone: "0456789123",
  drAddress: {
    line1: "234 Tim St",
    line2: "1234",
    city: "Melbourne",
    state: "VIC",
    postcode: "5774",
    country: "Australia",
  },
  drCode: "056923",
  drPrescriberNo: "7892345",
  drQualifications: "Physiotheraphy, Pediatrics",
  drLanguagesSpoken: "English, German",
  drClinicName: "testClinic",
  drAvail: true,
});

const mockInvalidDoctor = new Doctor({
  drGivenName: "Timothy",
  drSurname: "Limmen",
  drPreferredName: "Tim",
  drDOB: "",
  drBirthSex: "Male",
  drEmail: "",
  drPhone: "",
  drAddress: {
    line1: "234 Tim St",
    line2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  },
  drCode: "",
  drPrescriberNo: "",
  drQualifications: "",
  drLanguagesSpoken: "",
  drClinicName: "",
  drAvail: false,
});

// Mock Appointment Data
const mockAppointment = new Appointment({
    dateOfAppointment: "2022-01-20",
    drEmail: mockDoctor.drEmail,
    ptEmail: mockPatient.ptEmailAddress,
    aptLink: "1kjNjsiu@doapl/!"
})

const mockInvalidAppointment = new Appointment({
    dateOfAppointment: "2022-01-20",
    drEmail: mockInvalidDoctor.drEmail,
    ptEmail: mockInvalidPatient.ptEmailAddress,
    aptLink: ""
})

module.exports = {
  mockClinic,
  mockInvalidClinic,
  mockPatient,
  mockInvalidPatient,
  mockDoctor,
  mockInvalidDoctor,
  mockAppointment,
  mockInvalidAppointment
};
