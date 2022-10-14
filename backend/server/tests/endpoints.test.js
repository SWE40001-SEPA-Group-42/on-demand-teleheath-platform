const request = require("supertest");
const {
  mockClinic,
  mockInvalidClinic,
  mockPatient,
  mockInvalidPatient,
  mockDoctor,
  mockInvalidDoctor,
  mockAppointment,
  mockInvalidAppointment,
} = require("./init");
const { app, connectDB, closeDB } = require("../server");

process.env.NODE_ENV = "test";

// Establish Connection
connectDB();

// Uncomment this if using an older system
// jest.setTimeout(30000)

// ---------------------------- Clinic Collection Testing --------------------------------------
describe("Clinic Routes", () => {
  // POST REQUEST
  describe("Given a clinic's details", () => {
    test("a clinic record should be created with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/clinics/")
        .send({
          clName: mockClinic.clName,
          clAddress: {
            line1: mockClinic.clAddress.line1,
            line2: mockClinic.clAddress.line2,
            city: mockClinic.clAddress.city,
            state: mockClinic.clAddress.state,
            postcode: mockClinic.clAddress.postcode,
            country: mockClinic.clAddress.country,
          },
          clPhone: mockClinic.clPhone,
          clEmailAddress: mockClinic.clEmailAddress,
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("Given a clinic's incorrect details", () => {
    test("a clinic record should not be created with a 422 status code", async () => {
      const response = await request(app)
        .post("/api/clinics/")
        .send({
          clName: mockInvalidClinic.clName,
          clAddress: {
            line1: mockInvalidClinic.clAddress.line1,
            line2: mockInvalidClinic.clAddress.line2,
            city: mockInvalidClinic.clAddress.city,
            state: mockInvalidClinic.clAddress.state,
            postcode: mockInvalidClinic.clAddress.postcode,
            country: mockInvalidClinic.clAddress.country,
          },
          clPhone: mockInvalidClinic.clPhone,
          clEmailAddress: mockInvalidClinic.clEmailAddress,
        });
      expect(response.statusCode).toBe(422);
    });
  });

  describe("Given a clinic's name", () => {
    //GET REQUEST providing Clinic Name
    test("my searched clinic will return with a 200 status code", async () => {
      const response = await request(app).get("/api/clinics/").send({
        clName: mockClinic.clName,
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    //PUT REQUEST
    test("my searched clinic will be updated with a return with a 200 status code", async () => {
      const response = await request(app)
        .put("/api/clinics/")
        .send({
          clName: "testClinic",
          clAddress: {
            line1: "321 Test St",
            line2: "543 Test Ln",
            city: "Sydney",
            state: "NSW",
            postcode: "9006",
            country: "Australia",
          },
          clPhone: "0358857621",
          clEmailAddress: "testClinicNEW@test.com",
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  /*
  describe("PUT /api/clinics/:id", () => {
    describe("Given a clinic's ID", () => {
      test("their details will be updated with a 200 status code", async () => {
        const response = await request(app).put(`/api/clinics/1`).send({
          _id: 1,
          clName: "newTestClinic",
          clinicAddress: {
            line1: "321 Test St",
            line2: "543 Test Ln",
            city: "Sydney",
            state: "NSW",
            postcode: "9006",
            country: "Australia",
          },
          clPhone: "04908762234",
          clEmailAddress: "testClinicNEW@test.com",
        })
          expect(response.statusCode).toBe(200)
      })
    })
  */
});

// ---------------------------- DOCTOR Collection Testing --------------------------------------

describe("Doctor Routes", () => {
  //POST REQUEST
  //Date has to be passed in manually...
  describe("Given a doctor's details", () => {
    test("a doctor record should be created with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/doctors/")
        .send({
          drGivenName: mockDoctor.drGivenName,
          drSurname: mockDoctor.drSurname,
          drPreferredName: mockDoctor.drPreferredName,
          drDOB: "1992-01-01",
          drBirthSex: mockDoctor.drBirthSex,
          drEmail: mockDoctor.drEmail,
          drPhone: mockDoctor.drPhone,
          drAddress: {
            line1: mockDoctor.drAddress.line1,
            line2: mockDoctor.drAddress.line2,
            city: mockDoctor.drAddress.city,
            state: mockDoctor.drAddress.state,
            postcode: mockDoctor.drAddress.postcode,
            country: mockDoctor.drAddress.country,
          },
          drCode: mockDoctor.drCode,
          drPrescriberNo: mockDoctor.drPrescriberNo,
          drQualifications: mockDoctor.drQualifications,
          drLanguagesSpoken: mockDoctor.drLanguagesSpoken,
          drClinicName: mockDoctor.drClinicName,
          drAvail: mockDoctor.drAvail,
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  //DASHBOARD REQUESTS
  describe("While in the Dashboard", () => {
    test("I can search for all available doctors", async () => {
      const response = await request(app).get("/api/doctors/status/").send({});
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("I can update a doctor's status", async () => {
      const response = await request(app).put("/api/doctors/status/").send({
        drEmail: mockDoctor.drEmail,
        drAvail: false,
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("Given a doctor's incorrect details", () => {
    test("a doctor record should not be created with a 422 status code", async () => {
      const response = await request(app)
        .post("/api/doctors/")
        .send({
          drGivenName: mockInvalidDoctor.drGivenName,
          drSurname: mockInvalidDoctor.drSurname,
          drPreferredName: mockInvalidDoctor.drPreferredName,
          drDOB: "1992-10-10",
          drBirthSex: mockInvalidDoctor.drBirthSex,
          drEmail: mockInvalidDoctor.drEmail,
          drPhone: mockInvalidDoctor.drPhone,
          drAddress: {
            line1: mockInvalidDoctor.drAddress.line1,
            line2: mockInvalidDoctor.drAddress.line2,
            city: mockInvalidDoctor.drAddress.city,
            state: mockInvalidDoctor.drAddress.state,
            postcode: mockInvalidDoctor.drAddress.postcode,
            country: mockInvalidDoctor.drAddress.country,
          },
          drCode: mockInvalidDoctor.drCode,
          drPrescriberNo: mockInvalidDoctor.drPrescriberNo,
          drQualifications: mockInvalidDoctor.drQualifications,
          drLanguagesSpoken: mockInvalidDoctor.drLanguagesSpoken,
          drClinicName: mockInvalidDoctor.drClinicName,
          drAvail: mockInvalidDoctor.drAvail,
        });
      expect(response.statusCode).toBe(422);
    });
  });

  describe("Given a doctor's first name and last name", () => {
    //GET REQUEST providing First name
    test("my searched doctor will return with a 200 status code", async () => {
      const response = await request(app).get("/api/doctors/").send({
        drGivenName: mockDoctor.drGivenName,
        drSurname: mockDoctor.drSurname,
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    //PUT REQUEST
    test("my searched doctor will be updated with a return with a 200 status code", async () => {
      const response = await request(app)
        .put("/api/doctors/")
        .send({
          drGivenName: "Timothy",
          drSurname: "Limmen",
          drPreferredName: "Tim",
          drDOB: "1997-01-01",
          drBirthSex: "Male",
          drEmail: "tim_limmen1234@gmail.com",
          drPhone: "0958865231",
          drAddress: {
            line1: "123 Tim Ln",
            line2: "King St",
            city: "Melbourne",
            state: "VIC",
            postcode: "5779",
            country: "Australia",
          },
          drCode: "056923",
          drPrescriberNo: "7892345",
          drQualifications: "Orthopedics, Pediatrics",
          drLanguagesSpoken: "English, German",
          drClinicName: "testClinic",
          drAvail: false,
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

// ---------------------------- PATIENT Collection Testing --------------------------------------

describe("Patient Routes", () => {
  //POST REQUEST
  describe("Given a patient's details", () => {
    test("a patient record should be created with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/patients/")
        .send({
          ptGivenName: mockPatient.ptGivenName,
          ptSurname: mockPatient.ptSurname,
          ptPreferredName: mockPatient.ptPreferredName,
          ptDOB: "2003-01-01",
          ptBirthSex: mockPatient.ptBirthSex,
          ptEmailAddress: mockPatient.ptEmailAddress,
          ptMobilePhone: mockPatient.ptMobilePhone,
          ptHomePhone: mockPatient.ptHomePhone,
          ptWorkPhone: mockPatient.ptWorkPhone,
          ptAddress: {
            line1: mockPatient.ptAddress.line1,
            line2: mockPatient.ptAddress.line2,
            city: mockPatient.ptAddress.city,
            state: mockPatient.ptAddress.state,
            postcode: mockPatient.ptAddress.postcode,
            country: mockPatient.ptAddress.country,
          },
          ptMedicareCardNo: mockPatient.ptMedicareCardNo,
          ptMedicareCardIRN: mockPatient.ptMedicareCardIRN,
          ptMedicareCardExpiryDate: "2023-05-10",
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
          ptDVAExpiryDate: "2023-05-10",
          ptHealthcareCardNo: mockPatient.ptHealthcareCardNo,
          ptHealthcareCardExpiryDate: "2023-05-10",
          ptPensionCardNo: mockPatient.ptPensionCardNo,
          ptPensionCardExpiryDate: "2023-05-10",
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("Given a patient's incorrect details", () => {
    test("a patient record should not be created with a 422 status code", async () => {
      const response = await request(app)
        .post("/api/patients/")
        .send({
          ptGivenName: mockInvalidPatient.ptGivenName,
          ptSurname: mockInvalidPatient.ptSurname,
          ptPreferredName: mockInvalidPatient.ptPreferredName,
          ptDOB: "2003-01-01",
          ptBirthSex: mockInvalidPatient.ptBirthSex,
          ptEmailAddress: mockInvalidPatient.ptEmailAddress,
          ptMobilePhone: mockInvalidPatient.ptMobilePhone,
          ptHomePhone: mockInvalidPatient.ptHomePhone,
          ptWorkPhone: mockInvalidPatient.ptWorkPhone,
          ptAddress: {
            line1: mockInvalidPatient.ptAddress.line1,
            line2: mockInvalidPatient.ptAddress.line2,
            city: mockInvalidPatient.ptAddress.city,
            state: mockInvalidPatient.ptAddress.state,
            postcode: mockInvalidPatient.ptAddress.postcode,
            country: mockInvalidPatient.ptAddress.country,
          },
          ptMedicareCardNo: mockInvalidPatient.ptMedicareCardNo,
          ptMedicareCardIRN: mockInvalidPatient.ptMedicareCardIRN,
          ptMedicareCardExpiryDate: "2023-99-99",
          ptPrivateHealthFund: mockInvalidPatient.ptPrivateHealthFund,
          ptPrivateHealthFundNo: mockInvalidPatient.ptPrivateHealthFundNo,
          ptEmgContactGivenName: mockInvalidPatient.ptEmgContactGivenName,
          ptEmgContactSurname: mockInvalidPatient.ptEmgContactSurname,
          ptEmgContactRelationship: mockInvalidPatient.ptEmgContactRelationship,
          ptEmgContactMobilePhone: mockInvalidPatient.ptEmgContactMobilePhone,
          ptEmgContactHomePhone: mockInvalidPatient.ptEmgContactHomePhone,
          ptEmgContactWorkPhone: mockInvalidPatient.ptEmgContactWorkPhone,
          ptNextOfKinGivenName: mockInvalidPatient.ptNextOfKinGivenName,
          ptNextOfKinSurname: mockInvalidPatient.ptNextOfKinSurname,
          ptNextOfKinRelationship: mockInvalidPatient.ptNextOfKinRelationship,
          ptNextOfKinMobilePhone: mockInvalidPatient.ptNextOfKinMobilePhone,
          ptNextOfKinHomePhone: mockInvalidPatient.ptNextOfKinHomePhone,
          ptNextofKinWorkPhone: mockInvalidPatient.ptNextofKinWorkPhone,
          ptDVAFileNo: mockInvalidPatient.ptDVAFileNo,
          ptDVAExpiryDate: "2023-05-10",
          ptHealthcareCardNo: mockInvalidPatient.ptHealthcareCardNo,
          ptHealthcareCardExpiryDate: "2023-05-10",
          ptPensionCardNo: mockInvalidPatient.ptPensionCardNo,
          ptPensionCardExpiryDate: "2023-05-10",
        });
      expect(response.statusCode).toBe(422);
    });
  });

  describe("Given a patient's first name", () => {
    //PUT REQUEST
    test("my searched patient will be updated with a return with a 200 status code", async () => {
      const response = await request(app)
        .put("/api/patients/")
        .send({
          ptGivenName: "Eddard",
          ptSurname: "Stark",
          ptPreferredName: "Ned",
          ptDOB: "1964-01-01",
          ptBirthSex: "Male",
          ptEmailAddress: "e.stark123@gmail.com",
          ptMobilePhone: "0456744241",
          ptHomePhone: "",
          ptWorkPhone: "",
          ptAddress: {
            line1: "345 Winter Lane",
            line2: "",
            city: "Sydney",
            state: "NSW",
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
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    //GET REQUEST provided First name
    test("my searched patient will return with a 200 status code", async () => {
      const response = await request(app).get("/api/patients/").send({
        ptGivenName: mockPatient.ptGivenName,
        ptSurname: mockPatient.ptSurname,
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

// ---------------------------- Appointment Testing --------------------------------------

describe("Handling Appointments", () => {
  // POST REQUEST
  test("Able to create an appointment", async () => {
    const response = await request(app)
      .post("/api/dashboard/appointment/")
      .send({
        dateOfAppointment: "2022-01-18",
        drEmail: mockAppointment.drEmail,
        ptEmail: mockAppointment.ptEmail,
        aptLink: mockAppointment.aptLink,
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("Unable create a invalid appointment", async () => {
    const response = await request(app)
      .post("/api/dashboard/appointment/")
      .send({
        dateOfAppointment: mockInvalidAppointment.dateOfAppointment,
        drEmail: mockInvalidAppointment.drEmail,
        ptEmail: mockInvalidAppointment.ptEmail,
        aptLink: mockInvalidAppointment.aptLink,
      });
    expect(response.statusCode).toBe(422);
  });

  // GET REQUEST
  test("Able to search for an appointment", async () => {
    const response = await request(app)
      .get("/api/dashboard/appointment/")
      .send({
        drEmail: mockAppointment.drEmail,
        ptEmail: mockAppointment.ptEmail,
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  // PUT REQUEST
  test("Able to modify an appointment date", async () => {
    const response = await request(app)
      .put("/api/dashboard/appointment/")
      .send({
        dateOfAppointment: "2022-01-20",
        drEmail: mockAppointment.drEmail,
        ptEmail: mockAppointment.ptEmail,
        aptLink: mockAppointment.aptLink,
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
 
  /* TODO Mock ID somehow
  test("Able to modify an appointment doctor or patient", async () => {
    const response = await request(app)
      .put("/api/dashboard/appointment/:id")
      .send({
        dateOfAppointment: "2022-01-20",
        drEmail: "tim.limmen123",
        ptEmail: mockAppointment.ptEmail,
        aptLink: mockAppointment.aptLink,
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  */

  // DELETE REQUEST
  test("Able to delete an appointment", async () => {
    const response = await request(app)
      .delete("/api/dashboard/appointment/")
      .send({
        drEmail: mockAppointment.drEmail,
        ptEmail: mockAppointment.ptEmail,
      });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("Clearing Data", () => {
  // DELETE REQUEST(S)
  test("my searched clinic will be deleted with a return with a 200 status code", async () => {
    const response = await request(app).delete("/api/clinics/").send({
      clName: mockClinic.clName,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  /*
  //TODO Mock ID somehow
  describe("Given a clinic's details", () => {
    test("a clinic record should be deleted with a 200 status code", async () => {

      await request(app)
        .delete(`/api/clinics/1`)
        .expect(200)
    })
  })
  */

  test("my searched patient will be deleted with a return with a 200 status code", async () => {
    const response = await request(app).delete("/api/patients/").send({
      ptGivenName: mockPatient.ptGivenName,
      ptSurname: mockPatient.ptSurname,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("my searched doctor will be deleted with a return with a 200 status code", async () => {
    const response = await request(app).delete("/api/doctors/").send({
      drGivenName: mockDoctor.drGivenName,
      drSurname: mockDoctor.drSurname,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

// Close Connection
closeDB();
