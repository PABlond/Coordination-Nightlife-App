export interface IReview {
  image_url: string
  name: string
  rating: number
  time_created: string
  text: string
}

export interface IModalData {
  rating?: number
  name?: string
  photos?: string[]
  going?: {
    name: string
    when: string
  }[]
  reviews: IReview[]
  is_closed?: Boolean
  address?: string[]
  phone?: string
}
