import express from "express"
import Router from './routes'
require("dotenv").config()

const app = express()

app.get("/", (req, res) => {
  res.status(201).json("Done")
})

app.use(Router)

export default app