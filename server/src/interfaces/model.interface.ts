export interface IPlace {
  when: Date
  id: string
}

export interface IUser {
  email: string
  places?: IPlace[]
}
