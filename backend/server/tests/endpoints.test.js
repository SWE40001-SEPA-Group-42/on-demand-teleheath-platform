const request = require("supertest")
const Clinic = require('../models/clinic');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient')
const { app, connectDB, closeDB } = require("../server");

process.env.NODE_ENV = 'test'

// Establish Connection
connectDB()
    
describe('Clinic Routes', () => {

  // Make Test Data
  const mockClinic = new Clinic({
    clinicName: "testClinic",
    clinicAddress: "123 Test St",
    clinicContactNumber: "04123456793",
    clinicUrl: "https://test.com"
  }) 

  describe("POST /api/clinics/", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be created with a 200 status code", async () => {
          const response = await request(app).post("/api/clinics/").send({
            clinicName: mockClinic.clinicName,
            clinicAddress: mockClinic.clinicAddress,
            clinicContactNumber: mockClinic.clinicContactNumber,
            clinicUrl: mockClinic.clinicUrl
          })
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })

  describe("GET /api/clinics/", () => {
      describe("Given a clinic's name", () => {
        test("my searched clinic will return with a 200 status code", async () => {
            const response = await request(app).get("/api/clinics/").send({
              clinicName: mockClinic.clinicName
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
      })
  })

  describe("PUT /api/clinics/", () => {
    describe("Given a clinic's name", () => {
      test("PUT /api/clinics/", async () => {
        const responseGET = await request(app).put("/api/clinics/").send({
          clinicName: "testClinic",
          clinicAddress: "321 Test St",
          clinicContactNumber: "04908762234",
          clinicUrl: "https://test_new.com"
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })

  describe("DELETE /api/clinics/", () => {
    describe("Given a clinic's name", () => {
      test("DELETE /api/clinics", async () => {
        const responseGET = await request(app).delete("/api/clinics/").send({
          clinicName: mockClinic.clinicName
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })

  /*
  describe("PUT /api/clinics/:id", () => {
    describe("Given a clinic's ID", () => {
      test("their details will be updated with a 200 status code", async () => {
        const response = await request(app).put(`/api/clinics/1`).send({
          _id: 1,
          clinicName: "updatedTestClinic",
          clinicAddress: "321 Test St",
          clinicContactNumber: "04908762234",
          clinicUrl: "https://test_new.com"
        })
          expect(response.statusCode).toBe(200)
      })
    })
  })

  describe("DELETE /api/clinics/:id", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be deleted with a 200 status code", async () => {

        await request(app)
          .delete(`/api/clinics/1`)
          .expect(200)
      })
    })
  })
  */
})

// ---------------------------- DOCTOR Collection Testing --------------------------------------
//HAVE NOT TESTED 

describe('Doctor Routes', () => {
  //Mock Doctor Data
  const mockDoctor = new Doctor({
      drSurName: "test Surname", 
      drFirstName: "test Firstname",
      drCode: "test code",
      drAddress: "test address",
      drPhoneNo: "test phone number",
      drEmail: "test email", 
      drClinic: "test clinic name", 
      prescriberCode: "test prescriber code",
      drQualif: "test doctor qualification",
      drGender: "test doctor gender"
  }) 


  //POST Doctor REQUEST
  describe("/api/doctors/", () => {
    describe("Given a doctor's details", () => {
      test("a doctor record should be created with a 200 status code", async () => {
        const responsePOST = await request(app).post("/api/doctors/").send({
          drSurName: mockDoctor.drSurName, 
          drFirstName: mockDoctor.drFirstName,
          drCode: mockDoctor.drCode,
          drAddress: mockDoctor.drAddress,
          drPhoneNo: mockDoctor.drPhoneNo,
          drEmail: mockDoctor.drEmail, 
          drClinic: mockDoctor.drClinic, 
          prescriberCode: mockDoctor.prescriberCode,
          drQualif: mockDoctor.drQualif,
          drGender: mockDoctor.drGender
        })
        expect(responsePOST.statusCode).toBe(200)
        expect(responsePOST.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })


    describe("Given a doctor's first name", () => {

      //GET doctor REQUEST provided First name
      test("my searched doctor will return with a 200 status code", async () => {
          const responseGET = await request(app).get("/api/doctors/").send({
            drFirstName: mockDoctor.drFirstName
          })
          expect(responseGET.statusCode).toBe(200)
          expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

      //PUT doctor REQUEST
      test("my searched doctor will be updated with a return with a 200 status code", async () => {
        const responseGET = await request(app).put("/api/doctors/").send({
          drSurName: "test UPDATED Surname", 
          drFirstName: "test Firstname",
          drCode: "test code",
          drAddress: "test address",
          drPhoneNo: "test phone number",
          drEmail: "test UPDATED email", 
          drClinic: "test clinic name", 
          prescriberCode: "test prescriber code",
          drQualif: "test doctor qualification",
          drGender: "test doctor gender"
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })


      test("my searched doctor will be deleted with a return with a 200 status code", async () => {
        const responseGET = await request(app).delete("/api/doctors/").send({
            drFirstName: mockDoctor.drFirstName
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      }) 
  })
})


// ---------------------------- PATIENT Collection Testing --------------------------------------
//HAVE NOT TESTED

describe('Patient Routes', () => {
  const mockPatient = new Patient({
    ptFirstName: "patient first name", 
    ptLastName : "patient last name",
    ptDOB: "patient day of birth",
    ptGender: "patient gender",
    ptAddress : "patient address",
    ptReference: "patient references",
    ptPhoneNo: "patient phone Number",
    ptEmail: "patient email",
    ptMedicareID: "patient medicare card id",
  }) 


  //POST Patient REQUEST
  describe("/api/patients/", () => {
    describe("Given a patient's details", () => {
      test("a patient record should be created with a 200 status code", async () => {
        const responsePOST = await request(app).post("/api/patients/").send({
          ptFirstName: mockPatient.ptFirstName, 
          ptLastName : mockPatient.ptLastName,
          ptDOB: mockPatient.ptDOB,
          ptGender: mockPatient.ptGender,
          ptAddress : mockPatient.ptAddress,
          ptReference: mockPatient.ptReference,
          ptPhoneNo: mockPatient.ptPhoneNo,
          ptEmail: mockPatient.ptEmail,
          ptMedicareID: mockPatient.ptMedicareID,
        })
        expect(responsePOST.statusCode).toBe(200)
        expect(responsePOST.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })


  describe("Given a patient's first name", () => {

    //GET patient REQUEST provided First name
    test("my searched patient will return with a 200 status code", async () => {
        const responseGET = await request(app).get("/api/patients/").send({
          ptFirstName: mockPatient.ptFirstName
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    //PUT patient REQUEST
    test("my searched patient will be updated with a return with a 200 status code", async () => {
      const responseGET = await request(app).put("/api/patients/").send({
        ptFirstName: "patient TEST first name", 
        ptLastName : "patient last name",
        ptDOB: "patient TEST day of birth",
        ptGender: "patient gender",
        ptAddress : "patient address",
        ptReference: "patient references",
        ptPhoneNo: "patient TEST phone Number",
        ptEmail: "patient email",
        ptMedicareID: "patient medicare card id",
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    })


    test("my searched patient will be deleted with a return with a 200 status code", async () => {
      const responseGET = await request(app).delete("/api/patients/").send({
          ptFirstName: mockPatient.ptFirstName
      })
      expect(responseGET.statusCode).toBe(200)
      expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
    }) 
})

})


// Close Connection
closeDB()