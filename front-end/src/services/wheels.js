import axios from "axios"
const baseUrl = "/api/wheels"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (wheel) => {
  const response = await axios.post(baseUrl, wheel)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }
