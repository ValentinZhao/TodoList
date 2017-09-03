<template>
  <div id="app">
    <router-view></router-view>
    <progressbar></progressbar>
  </div>
</template>

<script>
import store from './vuex/store.js'
import progressBar from './components/common/progressBar.vue'

export default {
  name: 'app',
  store,
  components: {
    'progressbar': progressBar
  }
}
</script>

<style>
@import '/assets/css/_index';
@import '/assets/css/_ionicicon';

html, body {
  box-sizing: border-box;
  background: #f5f5f5;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul, ol {
  display: block;
  list-style-type: none;
  padding-left: 1.5em;
}
</style>
