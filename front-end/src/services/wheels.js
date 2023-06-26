import axios from "axios"
const baseUrl = "/api/wheels"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (wheel) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, wheel, config)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove, setToken }
