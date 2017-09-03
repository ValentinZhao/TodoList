import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import posts from '@/components/common/posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: '/',
          component: posts
        }
      ]
    }
  ]
})
