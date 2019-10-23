import mongoose from "mongoose"

export default mongoose.model(
  "user",
  new mongoose.Schema({
    email: String,
    places: [
      {
        id: String,
        when: String
      }
    ]
  })
)
