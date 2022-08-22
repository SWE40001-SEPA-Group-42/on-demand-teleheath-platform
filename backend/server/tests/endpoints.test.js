const request = require("supertest")
const { clinicModel } = require('../models/userModels');
const { app, connectDB, closeDB } = require("../server");

process.env.NODE_ENV = 'test'

// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })  
// })

beforeAll(async () => {
  await connectDB()
});

afterAll(async () => {
  await closeDB()
});

describe('Clinic Routes', () => {
  // Make Test Data
  const mockClinic = new clinicModel({
    clinicName: "testClinic",
    clinicAddress: "123 Test St",
    clinicContactNumber: "04123456793",
    clinicUrl: "https://test.com"
  }) 

  describe("/user/clinic/", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be created with a 200 status code", async () => {
        const responsePOST = await request(app).post("/user/clinic/").send({
          clinicName: mockClinic.clinicName,
          clinicAddress: mockClinic.clinicAddress,
          clinicContactNumber: mockClinic.clinicContactNumber,
          clinicUrl: mockClinic.clinicUrl
        })
        expect(responsePOST.statusCode).toBe(200)
        expect(responsePOST.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })

    describe("Given a clinic's name", () => {
      test("my searched clinic will return with a 200 status code", async () => {
          const responseGET = await request(app).get("/user/clinic/").send({
            clinicName: mockClinic.clinicName
          })
          expect(responseGET.statusCode).toBe(200)
          expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

      test("my searched clinic will be updated with a return with a 200 status code", async () => {
        const responseGET = await request(app).put("/user/clinic/").send({
          clinicName: "testClinic",
          clinicAddress: "321 Test St",
          clinicContactNumber: "04908762234",
          clinicUrl: "https://test_new.com"
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

      test("my searched clinic will be deleted with a return with a 200 status code", async () => {
        const responseGET = await request(app).delete("/user/clinic/").send({
          clinicName: mockClinic.clinicName
        })
        expect(responseGET.statusCode).toBe(200)
        expect(responseGET.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

    })
    
    /* Broken Test at the moment - Need to mock ID's somehow
    describe("Given a clinic's id", () => {

      test("their details will be updated with a 200 status code", async () => {
        const responseUPDATE = await request(app).put(`/user/clinic/${mockClinic.id}`).send({
          clinicName: "updatedTestClinic",
          clinicAddress: "321 Test St",
          clinicContactNumber: "04908762234",
          clinicUrl: "https://test_new.com"
        })
          expect(responseUPDATE.statusCode).toBe(200)
      })

      test("their record should be deleted with a 200 status code", async () => {
        const responseDELETE = await request(app).delete(`/user/clinic/${mockClinic._id}`)
          expect(responseDELETE.statusCode).toBe(200)
      })
    })
    */

  })
})
