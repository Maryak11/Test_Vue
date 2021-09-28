const API_URL = 'https://rickandmortyapi.com/api'

import axios from 'axios'

class DataService {
  getAll(page) {
    return axios.get(`${API_URL}/character/?page=${page}`)
  }
  getCurrentCharacter(characterId) {
    return axios.get(`${API_URL}/character/${characterId}`)
  }
  getCurrentEpisode(episodeId) {
    return axios.get(`${API_URL}/episode/${episodeId}`)
  }
  getCharacter(url) {
    return axios.get(`${url}`)
  }
}

export default new DataService()
