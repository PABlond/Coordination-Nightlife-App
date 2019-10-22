import axios from "axios"
import {
  ImageSearchParams,
  GoogleSearchImg
} from "./../interfaces/query.interface"

const { GOOGLE_IMAGE_APIKEY, GOOGLE_IMAGE_CX } = process.env

export default class ImgSearch {
  api_key = GOOGLE_IMAGE_APIKEY
  cx = GOOGLE_IMAGE_CX

  searchWithParams = async ({ search, start }: ImageSearchParams) => {
    const page = 1
    const res = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${search}&start=${start || 1}&cx=${this.cx}&key=${this.api_key}&searchType=image`
    )
    return this.organizeGoogleResponse(res.data.items)
  }

  organizeGoogleResponse = (items: GoogleSearchImg[]) =>
    items.map(
      ({
        link: url,
        snippet,
        image: { contextLink: context, thumbnailLink: thumbnail }
      }) => ({
        url,
        snippet,
        context,
        thumbnail
      })
    )
}
