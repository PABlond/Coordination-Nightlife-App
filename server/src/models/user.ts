import mongoose from "mongoose"

export default mongoose.model(
  "user",
  new mongoose.Schema({
    email: String,
    name: String,
    places: [
      {
        id: String,
        when: String
      }
    ]
  })
)
