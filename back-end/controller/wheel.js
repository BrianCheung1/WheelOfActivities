const wheelsRouter = require("express").Router()
const Wheel = require("../models/wheel")

wheelsRouter.get("/", async (request, response) => {
  const wheels = await Wheel.find({})
  response.json(wheels)
})

wheelsRouter.post("/", (request, response, next) => {
  const body = request.body
  if (body.content === undefined) {
    return response.status(400).json({ error: "content mising" })
  }
  const wheel = new Wheel({
    content: body.content,
  })

  wheel
    .save()
    .then((savedWheel) => {
      response.json(savedWheel)
    })
    .catch((error) => next(error))
})

wheelsRouter.get("/:id", (request, response, next) => {
  Wheel.findById(request.params.id)
    .then((wheel) => {
      if (wheel) {
        response.json(wheel)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

wheelsRouter.delete("/:id", (request, response, next) => {
  Wheel.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

wheelsRouter.put("/:id", (request, response, next) => {
  const { content } = request.body

  Wheel.findByIdAndUpdate(
    request.params.id,
    { content },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedWheel) => {
      response.json(updatedWheel)
    })
    .catch((error) => next(error))
})

module.exports = wheelsRouter
