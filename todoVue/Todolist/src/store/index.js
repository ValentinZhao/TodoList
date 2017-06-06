import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList
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
  }
})
