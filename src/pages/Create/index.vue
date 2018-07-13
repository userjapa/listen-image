<template lang="html">
  <div class="create">
    <h2 class="create__heading">Create Select Image Game</h2>
    <div class="create__box">
      <div class="create__box__view">
        <ListenImage :exercise="{ questions: [question] }"/>
      </div>
      <div class="create__box__form">
        <div class="create__box__form__questions">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(qst, index) in exercise.questions">
                <td>{{ index + 1 }})</td>
                <td>{{ qst.question }}</td>
                <td>{{ qst.answers.length }}</td>
                <td>
                  <button class="create__box__form__questions__edit"
                          :disabled="$store.getters['hasToUpdate']"
                          @click="edit(index, qst)">
                            Edit
                  </button>
                  <button class="create__box__form__questions__remove"
                          :disabled="$store.getters['hasToUpdate']"
                          @click="$store.commit('removeQuestion', index)">
                            Remove
                  </button>
                </td>
              </tr>
              <tr v-if="exercise.questions.length == 0">
                <td colspan="4">No Data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="create__box__form__question">
          <form name="question" class="create__box__form__question__info" @submit.prevent="addQuestion(question)">
            <div class="create__box__form__question__info__field">
              <input type="text" v-model="question.question"/>
            </div>
            <div class="create__box__form__question__info__field">
              <input ref="audio" type="file" @change="audioChanged($event.target.files[0])" v-show="false"/>
              <input type="text" @click="$refs['audio'].click()" placeholder="Upload an Audio" v-model="question.audio_original" readonly required>
            </div>
            <div class="create__box__form__question__info__field">
              <button type="submit" v-if="!$store.getters['hasToUpdate']">Save</button>
              <button type="button" @click.prevent="update(question)" v-else>Update</button>
              <button type="button" @click.prevent="cancel()" v-if="$store.getters['hasToUpdate']">Cancel</button>
            </div>
          </form>
          <form  name="answer" class="create__box__form__question__answer" @submit.prevent="addAnswer(answer)">
            <button type="submit">Add</button>
            <input ref="image" type="file" @change="imageChanged($event.target.files[0])" v-show="false"/>
            <input type="text" @click="$refs['image'].click()" placeholder="Upload an Image" v-model="answer.img_original" readonly required>
          </form>
          <div class="create__box__form__question__answers">
            <div class="create__box__form__question__answers__item">
              <div class="create__box__form__question__answers__item__img">
                <b>Image</b>
              </div>
              <div class="create__box__form__question__answers__item__correct">
                <b>Correct</b>
              </div>
              <div class="create__box__form__question__answers__item__option">
                <b>Option</b>
              </div>
            </div>
            <div class="create__box__form__question__answers__item" v-for="(aswr, index) in question.answers">
              <div class="create__box__form__question__answers__item__img">
                <img :src="aswr.img">
              </div>
              <div class="create__box__form__question__answers__item__correct">
                <input type="radio" name="correct" @change="correctChanged(index)" :checked="aswr.correct"/>
              </div>
              <div class="create__box__form__question__answers__item__option">
                <button @click="question.answers.splice(index, 1)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListenImage from '@/components/ListenImage'

export default {
  name: 'Create',
  data () {
    return {
      // exercise: {
      //   questions: []
      // },
      question: {
        question: '',
        audio: '',
        answers: []
      },
      answer: {
        img: '',
        correct: false
      }
    }
  },
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  methods: {
    checkAnswers (answers) {
      let hasCorrect = false
      answers.map(a => {
        if (a.correct) hasCorrect = true
      })
      if (hasCorrect) return true
      else return false
    },
    addQuestion (question) {
      if (question.answers.length == 0)
        alert('Answers must be informed.')
      else if (!this.checkAnswers(question.answers))
        alert('Correct answer must be selected.')
      else {
        this.$store.commit('addQuestion', question)
        this.question = {
          question: '',
          audio: '',
          answers: []
        }
      }
    },
    addAnswer (answer) {
      if (answer.img == '') alert('Image must be Uploaded!')
      else {
        this.question.answers.push(answer)
        this.answer = {
          img: '',
          correct: false
        }
      }
    },
    edit (index, question) {
      this.$store.commit('setToUpdate', index)
      this.question = question
    },
    update (question) {
      this.$store.commit('editQuestion', question)
      this.cancel()
    },
    cancel () {
      this.$store.commit('setToUpdate', null)
      this.question = {
        question: '',
        audio: '',
        answers: []
      }
    },
    audioChanged (file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.question.audio = e.target.result
        this.$set(this.question, 'audio_original', file.name)
      };
      reader.readAsDataURL(file)
      this.$set(this.question, 'audio_old', file)
    },
    imageChanged (file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.answer.img = e.target.result
        this.$set(this.answer, 'img_original', file.name)
      };
      reader.readAsDataURL(file)
      this.$set(this.answer, 'img_old', file)
    },
    correctChanged (index) {
      this.question.answers.map((a, i) => {
        if (index == i) a.correct = true
        else a.correct = false
      })
    }
  },
  components: {
    ListenImage
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/pages/create'
</style>
