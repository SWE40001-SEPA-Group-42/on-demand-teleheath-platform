const request = require("supertest")
const Clinic = require('../models/clinic');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient')
const { app, connectDB, closeDB } = require("../server");

process.env.NODE_ENV = 'test'

// Establish Connection
connectDB()

// ---------------------------- Clinic Collection Testing --------------------------------------
describe('Clinic Routes', () => {

  // Make Test Data
  const mockClinic = new Clinic({
    clName: "testClinic",
    clAddress: "123 Test St",
    line1: "123 Test St",
    line2: "345 Test Ln",
    city: "Melbourne",
    state: "VIC",
    postcode: "4578",
    country: "Australia",
    clPhone: "04123456793",
    clEmailAddress: "testClinic@test.com",
  }) 

  // const mockInvalidClinic = new Clinic({
  //   clName: "testClinic",
  //   clinicAddress: "123 Test St",
  //   line1: "123 Test St",
  //   line2: "345 Test Ln",
  //   city: "Melbourne",
  //   state: "VIC",
  //   postcode: "4578",
  //   country: "Australia",
  //   clPhone: "04123456793",
  //   clEmailAddress: "testClinic@test.com",
  // }) 

 // POST Clinic REQUEST
  describe("Given a clinic's details", () => {
    test("a clinic record should be created with a 200 status code", async () => {
        const response = await request(app).post("/api/clinics/").send({
          clName: mockClinic.clName,
          clAddress: mockClinic.clAddress,
          line1: mockClinic.line1,
          line2: mockClinic.line2,
          city: mockClinic.city,
          state: mockClinic.state,
          postcode: mockClinic.postcode,
          country: mockClinic.country,
          clPhone: mockClinic.clPhone,
          clEmailAddress: mockClinic.clEmailAddress,
        })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })
  
  describe("Given a clinic's name", () => {

    //GET Clinic REQUEST providing Clinic Name
    test("my searched clinic will return with a 200 status code", async () => {
      const response = await request(app).get("/api/clinics/").send({
        clName: mockClinic.clName
      })
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //PUT Clinic REQUEST
    test("my searched clinic will be updated with a return with a 200 status code", async () => {
      const responseGET = await request(app).put("/api/clinics/").send({
        clName: "testClinic",
        clAddress: "321 Test St",
        line1: "321 Test St",
        line2: "543 Test Ln",
        city: "Sydney",
        state: "NSW",
        postcode: "9006",
        country: "Australia",
        clPhone: "04908762234",
        clEmailAddress: "testClinicNEW@test.com",
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //DELETE Clinic REQUEST
    test("my searched clinic will be deleted with a return with a 200 status code", async () => {
      const responseGET = await request(app).delete("/api/clinics/").send({
        clName: mockClinic.clName
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  /*
    //PUT /api/clinics/:id"
    describe("Given a clinic's ID", () => {
      test("their details will be updated with a 200 status code", async () => {
        const response = await request(app).put(`/api/clinics/1`).send({
          _id: 1,
          clName: "newTestClinic",
          clinicAddress: "321 Test St",
          line1: "321 Test St",
          line2: "543 Test Ln",
          city: "Sydney",
          state: "NSW",
          postcode: "9006",
          country: "Australia",
          clPhone: "04908762234",
          clEmailAddress: "testClinicNEW@test.com",
        })
          expect(response.statusCode).toBe(200)
      })
    })

    //DELETE /api/clinics/:id
    describe("Given a clinic's details", () => {
      test("a clinic record should be deleted with a 200 status code", async () => {

        await request(app)
          .delete(`/api/clinics/1`)
          .expect(200)
      })
    })
  
  */
})

// ---------------------------- DOCTOR Collection Testing --------------------------------------

describe('Doctor Routes', () => {
  //Mock Doctor Data
  const mockDoctor = new Doctor({
    drGivenName: "Timothy",
    drSurname: "Limmen",
    drPreferredName: "Tim",
    drDOB: "1992-12-01",
    drBirthSex : "Male",
    drEmail: "tim_limmen@gmail.com",
    drPhone: "0458865231",
    drAddress: "Tim St",
    line1: "Tim St",
    line2: "",
    city: "Melbourne",
    state: "VIC",
    postcode: "5774",
    country: "Australia",
    drCode: "056923",
    drPrescriberNo: "7892345",
    drQualifications: "Physiotheraphy, Pediatrics",
    drLanguagesSpoken: "English, German",
    drClinicName: "testClinic"
  }) 

  //POST Doctor REQUEST
  describe("Given a doctor's details", () => {
    test("a doctor record should be created with a 200 status code", async () => {
      const responsePOST = await request(app).post("/api/doctors/").send({
        drGivenName: mockDoctor.drGivenName,
        drSurname: mockDoctor.drSurname,
        drPreferredName: mockDoctor.drPreferredName,
        drDOB: mockDoctor.drDOB,
        drBirthSex : mockDoctor.drBirthSex,
        drEmail: mockDoctor.drEmail,
        drPhone: mockDoctor.drPhone,
        drAddress: mockDoctor.drAddress,
        line1: mockDoctor.line1,
        line2: mockDoctor.line2,
        city: mockDoctor.city,
        state: mockDoctor.state,
        postcode: mockDoctor.postcode,
        country: mockDoctor.country,
        drCode: mockDoctor.drCode,
        drPrescriberNo: mockDoctor.drPrescriberNo,
        drQualifications: mockDoctor.drQualification,
        drLanguagesSpoken: mockDoctor.drLanguagesSpoken,
        drClinicName: mockDoctor.drClinicName
      });
      expect(responsePOST.statusCode).toBe(200)
      expect(responsePOST.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  describe("Given a doctor's first name", () => {
    //GET doctor REQUEST providing First name
    test("my searched doctor will return with a 200 status code", async () => {
        const responseGET = await request(app).get("/api/doctors/").send({
          drGivenName: mockDoctor.drGivenName
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //PUT doctor REQUEST
    test("my searched doctor will be updated with a return with a 200 status code", async () => {
      const responseGET = await request(app).put("/api/doctors/").send({
        drGivenName: "Timothy",
        drSurname: "Limmen",
        drPreferredName: "Tim",
        drDOB: "1997-01-01",
        drBirthSex : "Male",
        drEmail: "tim_limmen1234@gmail.com",
        drPhone: "0958865231",
        drAddress: "Tim Ln",
        line1: "Tim Ln",
        line2: "King St",
        city: "Melbourne",
        state: "VIC",
        postcode: "5779",
        country: "Australia",
        drCode: "056923",
        drPrescriberNo: "7892345",
        drQualifications: "Orthopedics, Pediatrics",
        drLanguagesSpoken: "English, German",
        drClinicName: "testClinic"
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //DELETE doctor REQUEST
    test("my searched doctor will be deleted with a return with a 200 status code", async () => {
      const responseGET = await request(app).delete("/api/doctors/").send({
        drGivenName: mockDoctor.drGivenName
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    }) 
  })
})


// ---------------------------- PATIENT Collection Testing --------------------------------------

describe('Patient Routes', () => {
  const mockPatient = new Patient({
    ptGivenName: "Eddard",
    ptSurname: "Stark",
    ptPreferredName: "Ned",
    ptDOB: "2003-01-01",
    ptBirthSex : "Male",
    ptEmailAddress: "e.stark@gmail.com",
    ptMobilePhone: "0456744241",
    ptHomePhone: "",
    ptWorkPhone: "",
    ptAddress: "123 Winter Lane",
    line1: "123 Winter Lane",
    line2: "",
    city: "Melbourne",
    state: "Northcote",
    postcode: "4573",
    country: "Australia",
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
    ptPensionCardExpiryDate: "2023-05-10"
  }) 


  //POST Patient REQUEST
  describe("Given a patient's details", () => {
    test("a patient record should be created with a 200 status code", async () => {
      const responsePOST = await request(app).post("/api/patients/").send({
        ptGivenName: mockPatient.ptGivenName,
        ptSurname: mockPatient.ptSurname,
        ptPreferredName: mockPatient.ptPreferredName,
        ptDOB: mockPatient.ptDOB,
        ptBirthSex : mockPatient.ptBirthSex,
        ptEmailAddress: mockPatient.ptEmailAddress,
        ptMobilePhone: mockPatient.ptMobilePhone,
        ptHomePhone: mockPatient.ptHomePhone,
        ptWorkPhone: mockPatient.ptWorkPhone,
        ptAddress: mockPatient.ptAddress,
        line1: mockPatient.line1,
        line2: mockPatient.line2,
        city: mockPatient.city,
        state: mockPatient.state,
        postcode: mockPatient.postcode,
        country: mockPatient.country,
        ptMedicareCardNo: mockPatient.ptMedicareCardNo,
        ptMedicareCardIRN: mockPatient.ptMedicareCardIRN,
        ptMedicareCardExpiryDate: mockPatient.ptMedicareCardExpiryDate,
        ptPrivateHealthFund: mockPatient.ptPrivateHealthFund,
        ptPrivateHealthFundNo: mockPatient.ptPrivateHealthFundNo,
        ptEmgContactGivenName: mockPatient.ptEmgContactGivenName,
        ptEmgContactSurname: mockPatient.ptEmgContactSurname,
        ptEmgContactRelationship: mockPatient.ptEmgContactRelationship,
        ptEmgContactMobilePhone: mockPatient.ptEmgContactMobilePhone,
        ptEmgContactHomePhone: mockPatient.ptEmgContactHomePhone,
        ptEmgContactWorkPhone: mockPatient.ptEmgContactWorkPhone,
        ptNextOfKinGivenName: mockPatient.ptNextOfKinGivenName,
        ptNextOfKinSurname: mockPatient.ptNextOfKinSurname,
        ptNextOfKinRelationship: mockPatient.ptNextOfKinRelationship,
        ptNextOfKinMobilePhone: mockPatient.ptNextOfKinMobilePhone,
        ptNextOfKinHomePhone: mockPatient.ptNextOfKinHomePhone,
        ptNextofKinWorkPhone: mockPatient.ptNextofKinWorkPhone,
        ptDVAFileNo: mockPatient.ptDVAFileNo,
        ptDVAExpiryDate: mockPatient.ptDVAExpiryDate,
        ptHealthcareCardNo: mockPatient.ptHealthcareCardNo,
        ptHealthcareCardExpiryDate: mockPatient.ptHealthcareCardExpiryDate,
        ptPensionCardNo: mockPatient.ptPensionCardNo,
        ptPensionCardExpiryDate: mockPatient.ptPensionCardExpiryDate
      })
      expect(responsePOST.statusCode).toBe(200)
      expect(responsePOST.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })
  


  describe("Given a patient's first name", () => {
    //PUT patient REQUEST
    test("my searched patient will be updated with a return with a 200 status code", async () => {
      const responseGET = await request(app).put("/api/patients/").send({
        ptGivenName: "Eddard",
        ptSurname: "Stark",
        ptPreferredName: "Ned",
        ptDOB: "2003-01-01",
        ptBirthSex : "Male",
        ptEmailAddress: "e.stark@gmail.com",
        ptMobilePhone: "0456744241",
        ptHomePhone: "",
        ptWorkPhone: "",
        ptAddress: "123 Winter Lane",
        line1: "123 Winter Lane",
        line2: "",
        city: "Melbourne",
        state: "Northcote",
        postcode: "4573",
        country: "Australia",
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
        ptPensionCardExpiryDate: "2023-05-10"
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //GET patient REQUEST provided First name
    test("my searched patient will return with a 200 status code", async () => {
      const responseGET = await request(app).get("/api/patients/").send({
        ptGivenName: mockPatient.ptGivenName,
        ptSurname: mockPatient.ptSurname
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    test("my searched patient will be deleted with a return with a 200 status code", async () => {
      const responseGET = await request(app).delete("/api/patients/").send({
          ptGivenName: mockPatient.ptGivenName,
          ptSurname: mockPatient.ptSurname
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    }) 
  })
})


// Close Connection
closeDB()