import express from "express"
import mongoose from "mongoose"
import Router from "./routes"
import passport from "passport"
import bodyParser from "body-parser"
import jwtStatregy from './config/jwtStatregy'
require("dotenv").config()


const { MONGO_PASSWORD, MONGO_USER, MONGO_DB } = process.env

mongoose.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds137008.mlab.com:37008/stock-checker`,
  {
    useNewUrlParser: true
  }
)
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(passport.initialize())
jwtStatregy(passport)
app.get("/", function(req, res) {
  res.status(201).json("Done")
})

app.use(Router)

export default app
