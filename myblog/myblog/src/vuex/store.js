import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  showLoading: false
}

export default new Vuex.Store({
  state
})
