import request from "supertest"
import app from "./../src/app"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.body).toBe("Done")
    expect(response.status).toBe(201)
  })
})

describe("Test the /imagesearch/:search path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/imagesearch/lolcats")
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })

  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/imagesearch/lolcats?offset=11")
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })
})

describe("Test the /latest/imagesearch/ path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/latest/imagesearch/")
    expect(response.status).toBe(201)
  })
})
