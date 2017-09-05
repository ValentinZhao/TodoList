import axios from 'axios'
import Vue from 'vue'

Vue.use(axios)

const API_ROOT = 'http://127.0.0.1:3000'
const CLIENT = 'http://127.0.0.1:8079'

export default {
  getAllArticles () {
    return axios({
      method: 'GET',
      url: API_ROOT + '/api/articlelist',
      headers: {
        'Origin': CLIENT
      }
    })
  }
}

