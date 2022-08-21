const request = require("supertest")
const server = require('../server');
const mongoose = require('mongoose')
const { clinicModel } = require('../models/userModels')

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })  
})
    
describe('Clinic Routes', () => {

  // Make Test Data
  // const mockClinic = await clinicModel.create({
  //   clinicName: "testClinic",
  //   clinicAddress: "123 Test St",
  //   clinicContactNumber: "04123456793",
  //   clinicUrl: "https://test.com"
  // })

  beforeEach((done) => {
    mongoose.connect(
      process.env.TEST_MONGO_URI,
      { useNewUrlParser: true },
      () => done()
    )
  })
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    })
  })

  describe("POST /user/clinic/", () => {
    describe("Given a clinic's details", () => {
      test("a clinic record should be created with a 200 status code", async () => {
          const response = await request(server).post("/user/clinic/").send({
            clinicName: "Something",
            clinicAddress: "123 Something St",
            clinicContactNumber: "1234567",
            clinicUrl: "https://asdsads.com"
          })
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
    })
  })

  describe("GET /user/clinic/", () => {
      describe("Given a clinic's name", () => {
        test("my searched clinic will return with a 200 status code", async () => {
            const response = await request(server).get("/user/clinic/").send({
              clinicName: "newTestClinic"
            })
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
      })
  })

  // describe("PUT/user/clinic/:id", () => {
  //   describe("Given a clinic's ID", () => {
  //     test("their details will be updated with a 200 status code", async () => {
  //         const response = await request(server).put("/user/clinic/1").send({
  //           clinicName: "updatedTestClinic",
  //           clinicAddress: "321 Test St",
  //           clinicContactNumber: "04908762234",
  //           clinicUrl: "https://test_new.com"
  //         })
  //         expect(response.statusCode).toBe(200)
  //     })
  //   })
  // })

  // describe("DELETE /user/clinic/", () => {
  //   describe("Given a clinic's details", () => {
  //     test("a clinic record should be deleted with a 200 status code", async () => {

  //       await request(server)
  //         .delete('/user/clinic/' + mockClinic.id)
  //         .expect(200)
  //         .then(async () => {
  //           expect(await clinicModel.findOne({ _id: mockClinic.id })).toBeFalsy()
  //         })
  //     })
  //   })
  // })
})

// `/rest/posts/${_id}`


// test("a clinic record should be deleted with a 200 status code", async () => {
//   const response = await request(server).delete("/user/clinic/1").send({
//     clinicName: "newTestClinic",
//     clinicAddress: "123 Test St",
//     clinicContactNumber: "04123456793",
//     clinicUrl: "https://test.com"
//   })
//   expect(response.statusCode).toBe(200)
// })