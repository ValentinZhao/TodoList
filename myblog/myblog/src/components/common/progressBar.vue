<template>
  <div class="progress" v-show="progressStatus" :style="{width: percent + '%'}">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      percent: 0,
      progressStatus: false,
      startTimer: ''
    }
  },
  watch: {
    showLoading (newVal, oldVal) {
      if (newVal) {
        this.start()
      } else {
        this.finish()
      }
    }
  },
  methods: {
    start () {
      this.progressStatus = true
      this.percent = 0
      this.startTimer = window.setInterval(() => {
        this.percent += Math.random() * 20
      }, 100)
    },
    finish () {
      this.percent = 100
      clearInterval(this.startTimer)
      this.hide()
    },
    hide () {
      setTimeout(() => {
        this.progressStatus = false
      }, 300)
    }
  },
  mounted () {
    this.start()
    this.finish()
  },
  computed: {
    ...mapGetters([
      'showLoading'
    ])
  }
}
</script>

<style lang="scss" scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 100%;
  transition: width 0.2s, opacity 0.6s;
  opacity: 1;
  background-color: #42b983;
  z-index: 999999;
}
</style>

