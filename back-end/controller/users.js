const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
const { response } = require("express")

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
    spins: 0,
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

usersRouter.put("/:id", async (request, response) => {
  test = await User.findById(request.params.id)
  let updatedUser = await User.findByIdAndUpdate(
    request.params.id,
    {spins: test.spins+1},
    { new: true }
  )
  updatedUser = await User.findById(updatedUser._id).populate("wheels")
  response.json(updatedUser)
})
module.exports = usersRouter
