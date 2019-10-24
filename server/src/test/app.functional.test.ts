import request from "supertest"
import app from "./../app"

const search = "lolcats"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(201)
  })
})

describe("Test the /api/search path", () => {
  test("It should response with an array of buisnnesses", async () => {
    const city = "Paris"
    const response = await request(app)
    .post("/api/search")
    .send({city})
    expect(response.status).toBe(201)
    expect(response.body[0].location.city).toBe(city)
  })  
})

describe("Test the /api/business path", () => {
  test("It should response with an object of buisnness", async () => {
    const id = "PX1hwexNzzxd4-2HR-utUg"
    const response = await request(app)
    .post("/api/business")
    .send({id})
    expect(response.status).toBe(201)
    expect(response.body.id).toBe(id)
  })  
})