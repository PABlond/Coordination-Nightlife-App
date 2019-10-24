import axios from "axios"
import User from "./../models/user"

export default class Auth {
  client_secret = "82f573764a1152544d7ab3336809a2e007999103"
  client_id = "4e78567ab3cf78bb6571"

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

  createUser = async ({ email }: { email: string }) => {
    await new User({ email }).save()
  }

  githubAuth = async (code: string) => {
    const access_token = await this.reqAccessToken({ code })
    const email = await this.reqEmail({ access_token })
    if (!this.isUserExists({ email })) {
      await this.createUser({ email })
    }
    return { access_token }
  }
}
