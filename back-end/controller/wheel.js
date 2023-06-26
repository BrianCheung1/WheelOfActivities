const wheelsRouter = require("express").Router()
const Wheel = require("../models/wheel")
const { userExtractor } = require("../utils/middleware")

wheelsRouter.get("/", async (request, response) => {
  const wheels = await Wheel.find({}).populate("user", { username: 1, name: 1 })
  response.json(wheels)
})

wheelsRouter.post("/", userExtractor, async (request, response, next) => {
  const { content } = request.body

  const wheel = new Wheel({
    content: content,
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" })
  }
  wheel.user = user._id

  const savedWheel = await wheel.save()
  user.wheels = user.wheels.concat(savedWheel._id)
  await user.save()
  response.json(savedWheel)
})

wheelsRouter.get("/:id", async (request, response, next) => {
  const wheel = await Wheel.findById(request.params.id)
  response.json(wheel)
})

wheelsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const wheel = await Wheel.findById(request.params.id)
  const user = request.user
  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "Operation not permitted" })
  }
  user.wheels = user.wheels.filter((w) => w.toString() !== wheel.id.toString())
  await user.save()
  await wheel.remove()
  response.status(204).end()
})

wheelsRouter.put("/:id", async (request, response, next) => {
  const { content } = request.body
  const updatedWheel = await blog.findByIdAndUpdate(
    request.params.id,
    { content },
    { new: true }
  )
  response.json(updatedWheel)
})

module.exports = wheelsRouter
