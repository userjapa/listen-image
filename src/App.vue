<template>
  <div id="app" class="app">
    <header class="app__header">
      <h1>Observe the word and Select the correct Image</h1>
      <nav class="app__header__nav">
        <ul>
          <li><router-link :to="{ name: 'Create' }"> Create </router-link></li>
          <li><router-link :to="{ name: 'Preview' }"> Preview </router-link></li>
        </ul>
      </nav>
    </header>
    <main class="app__main">
      <router-view/>
    </main>
    <footer class="app__footer">
      <div class="app__footer__info">
        <p>Made by <strong>userJapa</strong></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import 'assets/scss/app';
</style>
