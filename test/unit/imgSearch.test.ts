import ImgSearch from "../../src/controllers/imgSearch"
import mongoose from "mongoose"

const imgSearch = new ImgSearch()

describe("Test organizeGoogleResponse", () => {
  test("It should return an empty array", async () => {
    const response = imgSearch.organizeGoogleResponse([])
    expect(response.length).toBe(0)
  })
})

describe("Test searchWithParams", () => {
  test("It should return an organized array", async () => {
    const search = "cats"
    const start = "1"
    const response = await imgSearch.searchWithParams({ search, start })
    expect(response.length).toBeGreaterThanOrEqual(0)
    expect(Object.keys(response[0])).toEqual(
      expect.arrayContaining(["url", "snippet", "context", "thumbnail"])
    )
  })
})

describe("Test getLastSearch", () => {
  test("It should return an array", async () => {
    const response = await imgSearch.getLastSearch()
    expect(response.length).toBeLessThanOrEqual(10)
  })
})

describe("Test organizeLastSearch", () => {
  test("It should return an array", async () => {
    const response = imgSearch.organizeLastSearch([{_id: "aSampleId", term: "term", when: new Date()}])
    expect(Object.keys(response[0])).toEqual(
      expect.arrayContaining(["term", "when"])
    )
    expect(response.length).toBe(1)
  })
})

beforeAll(async () => {
  const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}`, {
    useNewUrlParser: true
  })
})
