import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: null
  },
  getters: {
    getTodoList: state => {
      return state.todoList
    }
  },
  mutations: {
    setTodoList: (state, todoList) => {
      state.todoList = todoList
    }
  },
  actions: {
    setTodoList: ({
      commit
    }, todoList) => {
      return new Promise(function (resolve, reject) {
        commit('setTodoList', todoList)
        resolve()
      })
    }
  }
})
