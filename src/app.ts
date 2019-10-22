import express from "express"
import Router from './routes'
require("dotenv").config()

const app = express()

const { PORT, GOOGLE_IMAGE_APIKEY, GOOGLE_IMAGE_CSEID } = process.env

app.get("/", (req, res) => {
  res.status(201).json("Done")
})

app.use(Router)

module.exports = app