export interface IBar {
  id: string
  name: string
  image_url: string
  is_closed: Boolean
  phone: string
  location: {
    address1: string | undefined
    address2: string | undefined
    city: string
  }
  going: {
    name: string
    when: string
  }
}
