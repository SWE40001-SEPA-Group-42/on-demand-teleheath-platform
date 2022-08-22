const request = require("supertest")
const { clinicModel } = require('../models/userModels');
const { app, connectDB, closeDB } = require("../server");

process.env.NODE_ENV = 'test'

// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })  
// })

// Establish Connection
connectDB()
    
describe('Clinic Routes', () => {

  // Make Test Data
  const mockClinic = new clinicModel({
    clinicName: "testClinic",
    clinicAddress: "123 Test St",
    clinicContactNumber: "04123456793",
    clinicUrl: "https://test.com"
  }) 

  describe("POST /user/clinic/", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be created with a 200 status code", async () => {
          const response = await request(app).post("/user/clinic/").send({
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

  describe("GET /user/clinic/", () => {
      describe("Given a clinic's name", () => {
        test("my searched clinic will return with a 200 status code", async () => {
            const response = await request(app).get("/user/clinic/").send({
              clinicName: mockClinic.clinicName
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
      })
  })

  describe("PUT/user/clinic/:id", () => {
    describe("Given a clinic's ID", () => {
      test("their details will be updated with a 200 status code", async () => {
        const response = await request(app).put(`/user/clinic/${updateID.id}`).send({
          clinicName: "updatedTestClinic",
          clinicAddress: "321 Test St",
          clinicContactNumber: "04908762234",
          clinicUrl: "https://test_new.com"
        })
          expect(response.statusCode).toBe(200)
      })
    })
  })

  describe("DELETE /user/clinic/1", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be deleted with a 200 status code", async () => {

        await request(app)
          .delete(`/user/clinic/${mockClinic._id}`)
          .expect(200)
      })
    })
  })
})

// Close Connection
closeDB()