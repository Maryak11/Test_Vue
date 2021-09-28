import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Character from '../views/Character.vue'
import Episode from '../views/Episode.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/character/:charId',
    name: 'Character',
    component: Character
  },
  {
    path: '/episode/:episodeId',
    name: 'Episode',
    component: Episode
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
