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
    const {
      data: [{ email }]
    } = await axios.get(
      `https://api.github.com/user/emails?access_token=${access_token}`
    )
    const {
      data: { name }
    } = await axios.get(
      `https://api.github.com/user?access_token=${access_token}`
    )
    return { email, name }
  }

  isUserExists = async ({ email }: { email: string }) => {
    return !!(await User.findOne({ email }))
  }

  getUser = (email: string) => {
    return User.findOne({ email })
  }

  createUser = async ({ email, name }: { email: string; name: string }) => {
    await new User({ email, name }).save()
  }

  getToken = ({ email, name }: { email: string; name: string }) =>
    jwt.sign({ email }, this.jwt_secret)

  decodeToken = (token: string) => jwt.verify(token, this.jwt_secret)

  githubAuth = async (code: string) => {
    const access_token = await this.reqAccessToken({ code })
    const { email, name } = await this.reqEmail({ access_token })
    if (!(await this.isUserExists({ email }))) {
      await this.createUser({ email, name })
    }
    const token = this.getToken({ email, name })
    return { token }
  }
}
