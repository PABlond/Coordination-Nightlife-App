import request from "supertest"
import app from "./../app"

const search = "lolcats"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(201)
  })
})
