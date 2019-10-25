import axios from "axios"
import User from "./../models/user"
import jwt from "jsonwebtoken"

require("dotenv").config()

const { GITHUB_SECRET, GITHUB_ID, JWT_SECRET } = process.env

export default class Auth {
  client_secret = GITHUB_SECRET
  client_id = GITHUB_ID
  jwt_secret = JWT_SECRET as string

  reqAccessToken = async ({ code }: { code: string }) => {
    const { client_id, client_secret } = this
    const { data: tokenStr } = await axios.post(
      "https://github.com/login/oauth/access_token",
      { code, client_id, client_secret }
    )
    if (tokenStr.split("=").indexOf("access_token") !== -1)
      return tokenStr.split("=")[1].split("&scope")[0]
    else throw new Error("Bad credentials")
  }

  reqEmail = async ({ access_token }: { access_token: string }) => {
    const { data } = await axios.get(
      `https://api.github.com/user/emails?access_token=${access_token}`
    )
    return data[0].email as any
  }

  isUserExists = async ({ email }: { email: string }) => {
    return !!(await User.findOne({ email }))
  }

  getUserWithToken = async (token: string) => {
    const { email } = this.decodeToken(token) as { email: string }

    return User.findOne({ email })
  }

  createUser = async ({ email }: { email: string }) => {
    await new User({ email }).save()
  }

  getToken = (email: string) => jwt.sign({ email }, this.jwt_secret)

  decodeToken = (token: string) => jwt.verify(token, this.jwt_secret)

  githubAuth = async (code: string) => {
    const access_token = await this.reqAccessToken({ code })
    const email = await this.reqEmail({ access_token })
    if (!this.isUserExists({ email })) {
      await this.createUser({ email })
    }
    const token = this.getToken(email)
    return { token }
  }
}
