import express from "express"
import Auth from "./../controllers/auth"

const Router = express.Router()

const auth = new Auth()

Router.post("/github-cb", async (req, res) => {
  return res.status(201).json(await auth.githubAuth(req.body.code))
})

export default Router
