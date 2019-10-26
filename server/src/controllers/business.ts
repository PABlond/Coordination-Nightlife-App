import {
  getBusinessesQuery,
  getBusinessQuery,
  getBusinessReview
} from "./../config/yelpQueries"
import Auth from "./auth"
import { IBuisness, ReqReview } from "./../interfaces/query.interface"
import { IPlace } from "./../interfaces/model.interface"
import User from "./../models/user"

require("dotenv").config()

export default class Businesses {
  yelp_token = process.env.YELP_TOKEN
  auth = new Auth()

  formatToday = () => {
    const d = new Date()
    const year = d.getFullYear()
    let month = "" + (d.getMonth() + 1)
    let day = "" + d.getDate()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join(", ")
  }

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

    for await (const business of businesses) {
      business.going = await this.getOnGoingUser({ id: business.id })
    }
    return businesses
  }

  getBusiness = async ({ id }: any) => {
    const { data } = await getBusinessQuery({ id })
    const {
      data: { reviews }
    } = await getBusinessReview({ id })

    return this.formatData({
      ...data,
      going: await this.getOnGoingUser({ id: data.id }),
      reviews: this.formatReview(reviews)
    })
  }

  placeEvent = async ({
    id,
    date: when,
    email
  }: {
    id: string
    date: string
    email: string
  }) => {
    const user: any = await this.auth.getUser(email)
    if (user) {
      if (!user.places) user.places = []
      user.places.push({ when, id })
      await user.save()
    }
    return !!user
  }

  getOnGoingUser = async ({ id }: { id: string }) => {
    const usersGoing = await User.find({
      "places.id": id
    })
    return usersGoing.map(({ name, places }: any) => ({
      name,
      when: places
        .map(({ id: businessId, when }: IPlace) =>
          id === businessId ? when : null
        )
        .filter(Boolean)
    }))
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
    reviews,
    going
  }: IBuisness) => ({
    name,
    photos,
    rating,
    phone,
    address,
    coordinate,
    reviews,
    going
  })
}
