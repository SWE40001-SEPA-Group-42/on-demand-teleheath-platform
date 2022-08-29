const request = require("supertest")
const Clinic= require('../models/clinic');
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


  // describe("PUT /api/clinics/:id", () => {
  //   describe("Given a clinic's ID", () => {
  //     test("their details will be updated with a 200 status code", async () => {
  //       const response = await request(app).put(`/api/clinics/1`).send({
  //         _id: 1,
  //         clinicName: "updatedTestClinic",
  //         clinicAddress: "321 Test St",
  //         clinicContactNumber: "04908762234",
  //         clinicUrl: "https://test_new.com"
  //       })
  //         expect(response.statusCode).toBe(200)
  //     })
  //   })
  // })

  // describe("DELETE /api/clinics/:id", () => {
  //   describe("Given a clinic's details", () => {
  //     test("a clinic record should be deleted with a 200 status code", async () => {

  //       await request(app)
  //         .delete(`/api/clinics/1`)
  //         .expect(200)
  //     })
  //   })
  // })
})

// Close Connection
closeDB()