import { searchBusinesses as queryBusinesses } from "./../config/yelpQueries"
import client from "./../config/apolloClient"
import axios from "axios"

export default class Businesses {
  yelp_token = process.env.YELP_TOKEN

  getBusinesses = async (location: string) => {
    const {
      data: {
        search: { business: buisnesses }
      }
    } = await client.query({
      query: queryBusinesses,
      variables: {
        location
      }
    })
    return buisnesses
  }

  getBusiness = async ({ id }: any) => {
    const { YELP_TOKEN: authorization } = process.env

    const token =
      "WipzKR3FbdOYwddxs5J0YqWmGOakwWKJCXW20_5eeWiLAbBpeEjVhj5yOv7ZsP6YTx3XiO9CLwhgHAkoYndfjw7obb_0GC7yBX0bFxMgfg_3qAANT_Hd50Wb8WCxXXYx"
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}`,
      {
        headers: { Authorization: this.yelp_token }
      }
    )
    console.log(data)
    return data
  }
}
