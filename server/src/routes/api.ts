import express from "express"
import controllers from "./../controllers/"
import passport from "passport"
const { Auth, Businesses } = controllers

const Router = express.Router()

const auth = new Auth()
const businesses = new Businesses()

Router.post("/github-cb", async (req, res) => {
  const response: any = (await auth
    .githubAuth(req.body.code)
    .catch(err => ({ err }))) as { token: string } | { err: any }
  return res.status(response.err ? 401 : 201).json(response)
})

Router.post("/search", async (req, res) => {
  return res.status(201).json(await businesses.getBusinesses(req.body))
})

Router.post("/business", async (req, res) => {
  const { id } = req.body
  return res.status(201).json(await businesses.getBusiness(req.body))
})

Router.post(
  "/rsvp",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email } = req.user as { email: string }
    return res
      .status(201)
      .json(await businesses.placeEvent({ ...req.body, email }))
  }
)

export default Router
