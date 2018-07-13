<template lang="html">
  <ListenImage :exercise="exercise"/>
</template>

<script>
import ListenImage from '@/components/ListenImage'

export default {
  name: 'Preview',
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  components: {
    ListenImage
  }
}
</script>

<style lang="scss">
</style>
