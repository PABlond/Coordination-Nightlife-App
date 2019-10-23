import app from "./app"

const { PORT } = process.env

app.listen(PORT, () => {
  console.log("Server is listening on port 3000")
})

module.exports = app
