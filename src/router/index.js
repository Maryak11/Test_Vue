import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Character from '../views/Character.vue'
import Episode from '../views/Episode.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/character/:charId',
        name: 'Character',
        component: Character,
    },
    {
        path: '/episode/:episodeId',
        name: 'Episode',
        component: Episode,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
