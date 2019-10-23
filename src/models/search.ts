import mongoose from "mongoose"

export default mongoose.model(
  "search",
  new mongoose.Schema({
    term: String,
    when: String
  })
)
