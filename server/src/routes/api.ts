import express from "express"
import controllers from "./../controllers/"

const { Auth, Businesses } = controllers

const Router = express.Router()

const auth = new Auth()
const businesses = new Businesses()

Router.post("/github-cb", async (req, res) => {
  const response = await auth.githubAuth(req.body.code).catch(err => ({ err }))
  console.log("resp", response)
  return res.status(response.err ? 401 : 201).json(response)
})

Router.post("/search", async (req, res) => {
  const { city } = req.body

  return res.status(201).json(await businesses.getBusinesses(city))
})

Router.post("/business", async (req, res) => {
  const { id } = req.body
  console.log(id)
  return res.status(201).json(await businesses.getBusiness(req.body))
})

export default Router
