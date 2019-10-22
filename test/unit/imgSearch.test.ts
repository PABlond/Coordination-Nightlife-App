import ImgSearch from "../../src/controllers/imgSearch"

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
    expect(Object.keys(response[0])).toEqual(
      expect.arrayContaining(["url", "snippet", "context", "thumbnail"])
    )
  })
})
