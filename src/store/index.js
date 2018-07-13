import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exercise: {
      questions: [
        {
          question: 'Truck',
          audio: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b5/TahmKench.attack13.ogg/revision/latest?cb=20150624150708',
          answers: [
            {
              correct: true,
              img: 'https://www.trucks.com/wp-content/uploads/2018/01/truck-brian-california.jpg'
            },
            {
              correct: false,
              img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350'
            },
            {
              correct: false,
              img: 'https://wexfordbus.com/web/app/uploads/2016/09/our-buses.jpg'
            },
            {
              correct: false,
              img: 'https://www.bahn.com/en/view/mdb/pv/agenturservice/2011/mdb_22990_ice_3_schnellfahrstrecke_nuernberg_-_ingolstadt_1000x500_cp_0x144_1000x644.jpg'
            }
          ]
        }
      ]
    },
    toUpdate: null
  },
  getters: {
    getExercise ({ exercise }) {
      return exercise
    },
    getToUpdate ({ toUpdate }) {
      return toUpdate
    },
    hasToUpdate ({ toUpdate }) {
      if (toUpdate == null) return false
      else return true
    }
  },
  mutations: {
    addQuestion (state, question) {
      state.exercise.questions.push(question)
    },
    editQuestion (state, question) {
      const id = state.toUpdate
      Vue.set(state.exercise.questions, id, question)
    },
    removeQuestion (state, id) {
      Vue.delete(state.exercise.questions, id)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    }
  }
})
