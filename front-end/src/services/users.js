import axios from "axios"

const baseUrl = "/api/users"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const updateSpins = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, updateSpins }
