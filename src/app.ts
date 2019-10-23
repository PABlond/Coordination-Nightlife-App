import express from "express"
import mongoose from "mongoose"
import Router from "./routes"

require("dotenv").config()

const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DB}`, {
  useNewUrlParser: true
})

const app = express()

app.get("/", (req, res) => {
  res.status(201).json("Done")
})

app.use(Router)

export default app
