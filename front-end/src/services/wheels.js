import axios from "axios"
import storageService from "../services/storage"
const baseUrl = "/api/wheels"

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (wheel) => {
  const response = await axios.post(baseUrl, wheel, { headers })
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, remove }
