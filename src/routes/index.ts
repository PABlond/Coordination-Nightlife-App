import express from 'express'
import APIRouter from './api'

const Router = express.Router()

Router.use('/api', APIRouter)

export default Router