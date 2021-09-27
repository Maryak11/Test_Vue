const API_URL = 'https://rickandmortyapi.com/api'

import axios from 'axios'

class DataService {
  getAll(page) {
    return axios.get(`${API_URL}/character/?page=${page}`)
  }
}

export default new DataService()
