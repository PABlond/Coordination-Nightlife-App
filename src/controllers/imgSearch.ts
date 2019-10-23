import axios from "axios"
import {
  ImageSearchParams,
  GoogleSearchImg
} from "./../interfaces/query.interface"
import { ISearch } from "./../interfaces/model.interface"
import Search from "./../models/search"

require("dotenv").config()
const { GOOGLE_IMAGE_APIKEY, GOOGLE_IMAGE_CX } = process.env

export default class ImgSearch {
  api_key = GOOGLE_IMAGE_APIKEY
  cx = GOOGLE_IMAGE_CX

  searchWithParams = async ({ search, start }: ImageSearchParams) => {
    // Save the request in the database
    await this.saveSearch({ search, when: new Date() })
    // Request data using google image API
    const {
      data: { items }
    } = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${search}&start=${start ||
        1}&cx=${this.cx}&key=${this.api_key}&searchType=image`
    )
    // Format the result and return it
    return this.organizeGoogleResponse(items)
  }

  lastImageSearch = async () =>
    this.organizeLastSearch((await this.getLastSearch()) as any[])

  organizeGoogleResponse = (items: GoogleSearchImg[]) =>
    items.map(
      ({
        link: url,
        snippet,
        image: { contextLink: context, thumbnailLink: thumbnail } = {}
      }) => ({
        url,
        snippet,
        context,
        thumbnail
      })
    )

  organizeLastSearch = (arr: ISearch[]) =>
    arr.map(({ term, when }) => ({ term, when }))

  saveSearch = async ({ search: term, when }: ISearch) => {
    await new Search({ term, when }).save()
  }

  getLastSearch = async () => {
    return await Search.find({}).limit(10)
  }
}
