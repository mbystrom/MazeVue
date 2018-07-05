import Vue from 'vue'
import Router from 'vue-router'
import Maze from './views/Maze.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maze',
      component: Maze
    }
  ]
})
