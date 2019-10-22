import express from "express"
import ImgSearch from "./../controllers/imgSearch"
import { ImageSearchParams } from "./../interfaces/query.interface"

const Router = express.Router()
const imgSearch = new ImgSearch()

Router.use("/imagesearch/:search", async (req, res) => {
    const {offset: start} = req.query
  res
    .status(201)
    .json(await imgSearch.searchWithParams({...(req.params as any), start}))
})

Router.use("/latest/imagesearch/", (req, res) => {
  res.status(201).json("")
})

export default Router
