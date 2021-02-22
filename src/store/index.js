import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, description, date}) {
      const tasks = [...state.tasks]
      const index = tasks.findIndex(t => t.id === id)
      const task = tasks[index]

      const status = new Date(date) > new Date() ? 'active' : 'expired'

      tasks[index] = {
        ...task,
        date,
        description,
        status
      }

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const index = state.tasks.findIndex(t => t.id === id)
      state.tasks[index].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    },
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => {
      return s.tasks.find(task => task.id === id)
    }
  }
})
