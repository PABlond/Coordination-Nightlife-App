import Auth from "../../controllers/auth"
import mongoose from "mongoose"
import User from "./../../models/user"
import dotenv from "dotenv"
const auth = new Auth()

dotenv.config()

describe("Test isUserExists", () => {
  test("It should return true when a user exists", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const response = await auth.isUserExists({ email })
    expect(response).toBe(true)
  })

  test("It should return false when a user does not exists", async () => {
    const email = "john.doe@sample.net"
    const response = await auth.isUserExists({ email })
    expect(response).toBe(false)
  })
})

describe("Test createUser", () => {
  test("It should create a user in the database", async () => {
    const email = "john.doe@sample.net"
    const name = "John Doe"
    await auth.createUser({ email, name })
    const response = await auth.isUserExists({ email })
    await User.remove({ email })
    expect(response).toBe(true)
  })
})

describe("Test getUser", () => {
  test("It should retrieve a user in the database", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const response = (await auth.getUser(email)) as any
    expect(response.email).toBe(email)
  })
})

describe("Test getToken", () => {
  test("It should create a token", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const name = "John Doe"
    const response = await auth.getToken({ email, name })
    expect(response.length).toBeGreaterThan(0)
  })
})

describe("Test decodeToken", () => {
  test("It should decode a token", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const name = "John Doe"
    const token = auth.getToken({ email, name })
    const response = auth.decodeToken(token) as { email: string }
    expect(response.email).toBe(email)
  })
})

beforeAll(async () => {
  const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}`, {
    useNewUrlParser: true
  })
})
