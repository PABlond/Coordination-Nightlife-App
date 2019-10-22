import express from 'express'

const Router = express.Router()

Router.use('/imagesearch/:search', (req, res) => {
    res.json(req.params)
})

Router.use('/latest/imagesearch/', (req, res) => {
    res.json("")
})

export default Router