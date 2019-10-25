import {
  getBusinessesQuery,
  getBusinessQuery,
  getBusinessReview
} from "./../config/yelpQueries"
import Auth from "./auth"
import { IBuisness, ReqReview } from "./../interfaces/query.interface"
require("dotenv").config()

export default class Businesses {
  yelp_token = process.env.YELP_TOKEN
  auth = new Auth()

  getBusinesses = async ({
    city: location,
    offset = 0
  }: {
    city: string
    offset: Number
  }) => {
    const {
      data: { businesses }
    } = await getBusinessesQuery({ offset, location })
    console.log(
      `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&offset=${offset}`
    )

    return businesses
  }

  getBusiness = async ({ id }: any) => {
    const { data } = await getBusinessQuery({ id })
    const {
      data: { reviews }
    } = await getBusinessReview({ id })
    return this.formatData({
      ...data,
      reviews: this.formatReview(reviews)
    })
  }

  placeEvent = async ({
    id,
    date,
    token
  }: {
    id: string
    date: string
    token: string
  }) => {
    const when = new Date(date)
    const user: any = await this.auth.getUserWithToken(token as string)
    if (user) {
      if (!user.places) user.places = []
      user.places.push({ when, id })
      await user.save()
    }
    return !!user
  }

  formatReview = (reviews: ReqReview[]) =>
    reviews.map(
      ({ rating, text, time_created, user: { image_url, name } }) => ({
        rating,
        text,
        time_created,
        image_url,
        name
      })
    )

  formatData = ({
    name,
    rating,
    phone,
    photos,
    location: { display_address: address },
    coordinate,
    reviews
  }: IBuisness) => ({
    name,
    photos,
    rating,
    phone,
    address,
    coordinate,
    reviews
  })
}
