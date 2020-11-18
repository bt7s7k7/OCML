import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { EntityRoute } from './routes/EntityRoute'
import { HomeRoute } from './routes/HomeRoute'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'HomeRoute',
        component: HomeRoute
    },
    {
        path: "/entity/:entity",
        name: "EntityRoute",
        component: EntityRoute,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
