const mongoose = require("mongoose")

const wheelSchema = new mongoose.Schema({
  content: { type: String, required: true },
})

wheelSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Wheel", wheelSchema)
