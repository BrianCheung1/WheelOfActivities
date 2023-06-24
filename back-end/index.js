require("dotenv").config()
const express = require("express")
const Wheel = require("./models/wheel")
const app = express()
const cors = require("cors")
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(express.json())
app.use(requestLogger)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/wheels", (request, response) => {
  Wheel.find({}).then((Wheels) => {
    response.json(Wheels)
  })
})

app.post("/api/wheels", (request, response) => {
  const body = request.body
  if (body.content === undefined) {
    return response.status(400).json({ error: "content mising" })
  }
  const wheel = new Wheel({
    content: body.content,
  })

  wheel.save().then((savedWheel) => {
    response.json(savedWheel)
  })
})

app.get("/api/wheels/:id", (request, response) => {
  Wheel.findById(request.params.id)
    .then((wheel) => {
      if (wheel) {
        response.json(wheel)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: "malformatted id" })
    })
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
