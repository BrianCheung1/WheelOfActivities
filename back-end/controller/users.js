const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("wheels", { content: 1 })
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "`password` is shorter than the minimum allowed length (3)",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("wheels", {
    content: 1,
  })
  response.json(user)
})

module.exports = usersRouter
