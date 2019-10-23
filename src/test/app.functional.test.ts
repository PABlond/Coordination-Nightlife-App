import request from "supertest"
import app from "./../app"

const search = "lolcats"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.body).toBe("Done")
    expect(response.status).toBe(201)
  })
})

describe("Test the /imagesearch/:search path", () => {
  test("Without offset", async () => {
    const response = await request(app).get(`/api/imagesearch/${search}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })

  test("With offset", async () => {
    const response = await request(app).get(
      `/api/imagesearch/${search}?offset=11`
    )
    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
    expect(response.body.length).toBeGreaterThanOrEqual(0)
  })
})

describe("Test the /latest/imagesearch/ path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/latest/imagesearch/")
    expect(response.status).toBe(201)
    expect(response.body.length).toBeLessThanOrEqual(10)
    expect(Object.keys(response.body[0])).toEqual(
      expect.arrayContaining(["term", "when"])
    )
  })
})
