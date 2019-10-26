import Business from "../../controllers/business"
import mongoose from "mongoose"
import dotenv from "dotenv"
import deletePlaces from "./../helpers/deletePlaces"

const business = new Business()

dotenv.config()

describe("Test getBusinesses", () => {
  test("It should return an array with 12 different business", async () => {
    const city = "NYC"
    const response = await business.getBusinesses({ city, offset: 0 })
    expect(response.length).toBe(12)
  })
})

describe("Test getBusiness", () => {
  test("It should return an object with the target business", async () => {
    const id = "gjwELZmHUNO0WdqXYBEbcg"
    const response = await business.getBusiness({ id })
    expect(response.name).toBe("The Belfry")
  })
})

describe("Test placeEvent", () => {
  test("It should return an array", async () => {
    const id = "gjwELZmHUNO0WdqXYBEbcg"
    const date = "2021, 12, 25"
    const email = "pierre-alexis.blond@live.fr"
    const response = await business.placeEvent({ id, date, email })
    expect(response).toBe(true)
  })
})

describe("Test getOnGoingUser", () => {
  test("It should return an array", async () => {
    const id = "gjwELZmHUNO0WdqXYBEbcg"
    const response = await business.getOnGoingUser({ id })
    expect(response.length).toBe(1)
    expect(response[0].when[0]).toBe("2021, 12, 25")
    expect(response[0].name).toBe("Pierre-Alexis Blond")
  })
})

beforeAll(async () => {
  const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}`, {
    useNewUrlParser: true
  })
  await deletePlaces()
})

afterAll(async () => {
  await deletePlaces()
})
