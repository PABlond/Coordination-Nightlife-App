import Auth from "../../controllers/auth"
import mongoose from "mongoose"
import User from "./../../models/user"
import dotenv from 'dotenv';
const auth = new Auth()

require("dotenv").config();
describe("Test isUserExists", () => {
  test("It should return true when a user exists", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const response = await auth.isUserExists({ email })
    expect(response).toBe(true)
  })

  test("It should return false when a user exists", async () => {
    const email = "john.doe@sample.net"
    const response = await auth.isUserExists({ email })
    expect(response).toBe(false)
  })
})

describe("Test createUser", () => {
  test("It should create a user in the database", async () => {
    const email = "john.doe@sample.net"
    await auth.createUser({ email })
    const response = await auth.isUserExists({ email })
    await User.remove({email})
    expect(response).toBe(true)
  })
})

describe("Test getToken", () => {
  test("It should create a token", async () => {
    const email = "pierre-alexis.blond@live.fr"
    const response = await auth.getToken(email)
    expect(response.length).toBeGreaterThan(0)
  })
})

beforeAll(async () => {
  const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}`, {
    useNewUrlParser: true
  })
})
