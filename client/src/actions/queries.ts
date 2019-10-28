import axios from "axios"
import Auth from "./../actions/auth"
import { routes } from "./../config/constants"

const auth = new Auth()

export const getBusiness = async (id: string) => {
  const { data } = await axios.post(routes.getBusiness, {
    id,
  })
  return data
}

export const placeEvent = async (id: string, date: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  }
  await axios.post(routes.placeEvent, { id, date }, { headers })
}

export const search = async (city: string, offset: number) => {
  const { data } = await axios.post(routes.search, {
    city,
    offset,
  })
  return data
}

export const githubLogin = async (code: string) =>
  axios
    .post(routes.login, { code })
    .catch(err => ({ err }))
