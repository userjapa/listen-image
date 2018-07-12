<template lang="html">
  <div class="create">
    <h2 class="create__heading">Create Select Image Game</h2>
    <div class="create__box">
      <div class="create__box__view">
        <ListenImage/>
      </div>
      <div class="create__box__form">
        <div class="create__box__form__questions">
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Question</th>
                <th>Answers</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(qst, index) in questions">
                <td>{{ index + 1 }})</td>
                <td>{{ qst.question }})</td>
                <td>{{ qst.answers.length }})</td>
              </tr>
              <tr>
                <td></td>
                <td>No Data</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="create__box__form__question">
          <form name="question" class="create__box__form__question__info" @submit.prevent="addQuestion(question)">
            <div class="">
              <input type="text" v-model="question.question"/>
            </div>
            <div class="">
              <input ref="audio" type="file" @change="audioChanged($event.target.files[0])" v-show="false"/>
              <input type="text" @click="$refs['audio'].click()" placeholder="Upload an Audio" v-model="question.audio_original" readonly required>
            </div>
            <div class="">
              <button type="submit">Save</button>
            </div>
          </form>
          <form  name="answer" class="create__box__form__question__answer" @submit.prevent="addAnswer(answer)">
            <button type="submit">Add</button>
            <input ref="image" type="file" @change="imageChanged($event.target.files[0])" v-show="false"/>
            <input type="text" @click="$refs['image'].click()" placeholder="Upload an Image" v-model="answer.img_original" readonly required>
          </form>
          <div class="create__box__form__question__answers">
            <div class="create__box__form__question__answers__item" v-for="aswr in question.answers">
              <img :src="aswr.img">
              <input type="radio" />
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
      exercise: {
        questions: []
      },
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
    questions () {
      return []
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
        console.log(question)
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
    audioChanged (file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.question.audio = e.target.result
        this.$set(this.question, 'audio_original', file.name)
      };
      reader.readAsDataURL(file)
      this.question.audio_old = file
    },
    imageChanged (file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.answer.img = e.target.result
        this.$set(this.answer, 'img_original', file.name)
      };
      reader.readAsDataURL(file)
      this.answer.img_old = file
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
