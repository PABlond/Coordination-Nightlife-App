import mongoose from "mongoose"

export default mongoose.model(
  "user",
  new mongoose.Schema({
    email: String,
    places: [
      {
        place_id: String,
        when: String
      }
    ]
  })
)
