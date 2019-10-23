import express from "express"
import mongoose from "mongoose"
import Router from "./routes"
import path from "path"

require("dotenv").config()
const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds137008.mlab.com:37008/stock-checker`,
  {
    useNewUrlParser: true
  }
)
const app = express()

app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  const homepagePath = path.join(__dirname + "/index.html")
  res.sendFile(homepagePath)
})

app.use(Router)

export default app
