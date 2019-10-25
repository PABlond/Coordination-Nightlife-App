interface Hours {
  is_open_now: Boolean
}

export interface ReqReview {
  rating: Number
  text: string
  time_created: string
  user: { image_url: string; name: string }
}

export interface Review {
  name: string
  rating: Number
  text: string
  time_created: string
}

interface OnGoing {
  name: string
  when: string
}

export interface IBuisness {
  name: string
  rating: string
  photos: string[]
  phone: string
  location: {
    display_address: String[]
  }
  coordinate: {
    latitude: Number
    longitude: Number
  }
  reviews: Review[]
  going: OnGoing[]
}
