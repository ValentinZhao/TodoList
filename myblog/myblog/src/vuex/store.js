import Vue from 'vue'
import Vuex from 'vuex'
import {
  GET_ALL_ARTICLES
} from './mutation-type'
import api from '../api'

Vue.use(Vuex)

const state = {
  articleList: [],
  showLoading: false
}

const mutations = {
  [GET_ALL_ARTICLES] (state, articleList) {
    state.articleList = articleList
  }
}

const getters = {
  getArticleList: state => state.articleList,
  getShowLoading: state => state.showLoading
}

const actions = {
  'getAllArticles': ({ commit }) => {
    return new Promise((resolve, reject) => {
      api.getAllArticles().then((res) => {
        console.log(res)
        commit(GET_ALL_ARTICLES, res.data.articleList)
        resolve(res)
      }).catch((err) => {
        alert(err)
      })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
