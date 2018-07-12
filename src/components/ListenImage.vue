<template lang="html">
  <div class="game">
    <div class="game__question">
      <div class="game__question__word">
        <span>{{ question.question }}</span>
      </div>
      <div class="game__question__audio">
        <i @click="play()">P</i>
        <input type="range"/>
        <audio ref="audio"
               :src="question.audio"
               @loadstart="loading = true"
               @loadeddata="loading = false"
               @pause="playing = false"
               @playing="playing = true"/>
      </div>
    </div>
    <div class="game__answers">
      <div class="game__answers__image"
           v-for="aswr in question.answers"
           :style="{ 'background-image': `url(${aswr.img})` }"
           :class="{
              right: aswr.correct && question.answered,
              wrong: !aswr.correct && aswr.selected && question.answered
           }"
           @click="selectAnswer(aswr)">
      </div>
    </div>
    <div class="game__options">
      <button class="game__options__btn" :disabled="!question.answered">Next</button>
      <button class="game__options__btn">Finish</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListenImage',
  data () {
    return {
      question: {
        question: 'Truck',
        audio: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b5/TahmKench.attack13.ogg/revision/latest?cb=20150624150708',
        answers: [
          {
            correct: true,
            img: 'https://www.trucks.com/wp-content/uploads/2018/01/truck-brian-california.jpg',
            selected: false
          },
          {
            correct: false,
            img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350',
            selected: false
          },
          {
            correct: false,
            img: 'https://wexfordbus.com/web/app/uploads/2016/09/our-buses.jpg',
            selected: false
          },
          {
            correct: false,
            img: 'https://www.bahn.com/en/view/mdb/pv/agenturservice/2011/mdb_22990_ice_3_schnellfahrstrecke_nuernberg_-_ingolstadt_1000x500_cp_0x144_1000x644.jpg',
            selected: false
          }
        ],
        answered: false
      },
      index: 0,
      ended: false,
      loading: false,
      playing: false
    }
  },
  props: {
    exercise: Object
  },
  methods: {
    setCurrent (questions) {
      for (const ind in questions) {
        this.index = ind
        if (!questions[ind].answered) this.question = questions[ind]
        else if (ind == (questions.length - 1)) {
          this.question = questions[ind]
          this.end = true
        }
      }
    },
    selectAnswer (answer) {
      if (!this.question.answered) {
        this.$set(answer, 'selected', true)
        this.$set(this.question, 'answered', true)
      }
    },
    play () {
      if (!this.playing) this.$refs['audio'].play()
    }
  },
  watch: {
    'question.audio': function () {
      this.$refs['audio'].pause()
      this.$refs['audio'].load()
    }
  }
}
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 91%;
  &__question {
    border: 2px solid blue;
    padding: 1rem 2rem;
    display: grid;
    grid-template-rows: 5rem 5rem;
    &__word {
      display: flex;
      justify-content: center;
      & span {
        letter-spacing: 1.5px;
        background-color: #ffb500;
        margin: auto;
        padding: .65rem 3rem;
        border-radius: 100px;
      }
    }
    &__audio {
      display: flex;
      justify-content: center;
      & i, input {
        margin: auto 1rem;
      }
      & i {
        background-color: gray;
        padding: .75rem 1.25rem;
        border-radius: 100px;
        &:hover {
          cursor: pointer;
        }
      }
      & input {
        background-color: gray;
        border: 2px solid black;
      }
    }
  }
  &__answers {
    border: 2px solid blue;
    padding: 1rem 2rem;
    display: flex;
    height: 100%;
    &__image {
      border: .75rem solid white;
      flex-grow: 1;
      border-radius: 2.5rem;
      background-size: cover;
      &:not(:last-child) {
        margin-right: 2rem;
      }
      &.right {
        border-color: green;
      }
      &.wrong {
        border-color: red;
      }
    }
  }
  &__options {
    border: 2px solid blue;
    padding: 1rem 2rem;
    display: flex;
    justify-content: flex-end;
    &__btn {
      align-self: center;
      padding: 1rem 3rem;
      margin-right: 5px;
      border-radius: 100px;
      background-color: #3bbfd4;
      font-weight: 600;
      font-size: 1.4rem;
      color: #fff;
      letter-spacing: 1.5px;
      &:hover,
      &:focus {
        background-color: #28a1b4;
        cursor: pointer;
        outline: none;
      }
      &:disabled {
        filter: grayscale(90%);
      }
    }
  }
}
</style>
