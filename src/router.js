import Vue from 'vue'
import Router from 'vue-router'
import Maze from './views/Maze.vue'
import Rewrite from './views/Rewrite.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maze',
      component: Maze
    },
    {
      path: '/rewrite',
      name: Rewrite,
      component: Rewrite
    }
  ]
})
