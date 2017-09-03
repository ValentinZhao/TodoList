<template>
  <div class="home-container rd-row-flex flex-space-between">
    <leftmenu></leftmenu>
    <router-view></router-view>
    <sidebar></sidebar>
  </div>
</template>

<script>
import leftmenu from '../components/common/leftMenu.vue'
import posts from '../components/common/posts.vue'
import sidebar from '../components/common/sideBar.vue'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    leftmenu,
    posts,
    sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.home-container {
  position: relative;
  margin-right: 5%;
}
</style>
