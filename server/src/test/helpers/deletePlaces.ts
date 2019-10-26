import User from "./../../models/user"

export default async () => {
  const email = "pierre-alexis.blond@live.fr"
  const user = (await User.findOne({ email })) as any
  user.places = []
  await user.save()
}
