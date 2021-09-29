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
  getFilteredCharacterName(page, name) {
    return axios.get(`${API_URL}/character/?page=${page}&name=${name}`)
  }
  getFilteredCharacterStatus(page, status) {
    return axios.get(`${API_URL}/character/?page=${page}&status=${status}`)
  }
  getFilteredCharacterNameAndStatus(page, name, status) {
    return axios.get(
      `${API_URL}/character/?page=${page}&name=${name}&status=${status}`
    )
  }
}

export default new DataService()
