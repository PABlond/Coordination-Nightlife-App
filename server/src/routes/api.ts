import express from "express"
import controllers from "./../controllers/"

const { Auth, Businesses } = controllers

const Router = express.Router()

const auth = new Auth()
const businesses = new Businesses()

Router.post("/github-cb", async (req, res) => {
  return res.status(201).json(await auth.githubAuth(req.body.code))
})

Router.post("/search", async (req, res) => {
  const { city } = req.body

  return res.status(201).json(await businesses.getBusinesses(city))
})

Router.post("/business", async (req, res) => {
  const { id } = req.body

  return res.status(201).json(await businesses.getBusiness(req.body))
})

export default Router
