const wheelsRouter = require("express").Router()
const Wheel = require("../models/wheel")
const { userExtractor } = require("../utils/middleware")

wheelsRouter.get("/", async (request, response) => {
  const wheels = await Wheel.find({}).populate("user", { username: 1, name: 1 })
  response.json(wheels)
})

wheelsRouter.post("/", userExtractor, async (request, response, next) => {
  const { content } = request.body

  if (!content) {
    return response.status(401).json({ error: "Missing Content" })
  }

  const wheel = new Wheel({
    content: content,
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" })
  }
  wheel.user = user._id

  let savedWheel = await wheel.save()
  user.wheels = user.wheels.concat(savedWheel._id)
  await user.save()
  savedWheel = await Wheel.findById(savedWheel._id).populate("user")
  response.json(savedWheel)
})

wheelsRouter.get("/:id", async (request, response, next) => {
  const wheel = await Wheel.findById(request.params.id).populate("user")
  response.json(wheel)
})

wheelsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const wheel = await Wheel.findById(request.params.id)
  const user = request.user
  if (!user || wheel.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "Operation not permitted" })
  }
  user.wheels = user.wheels.filter((w) => w.toString() !== wheel.id.toString())
  await user.save()
  await wheel.remove()
  response.status(204).end()
})

wheelsRouter.put("/:id", async (request, response, next) => {
  const { content } = request.body
  const updatedWheel = await Wheel.findByIdAndUpdate(
    request.params.id,
    { content },
    { new: true }
  )
  updatedWheel = await Wheel.findById(updatedWheel._id).populate("user")
  response.json(updatedWheel)
})

module.exports = wheelsRouter
