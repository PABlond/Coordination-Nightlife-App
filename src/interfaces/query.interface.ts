export interface ImageSearchParams {
  search: string,
  start: string
}

export interface GoogleSearchImg {
  link: string
  snippet: string
  image: { contextLink: string; thumbnailLink: string }
}
