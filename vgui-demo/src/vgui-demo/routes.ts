import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { EntityCreateRoute } from './routes/EntityCreateRoute'
import { EntityIndexRoute } from './routes/EntityIndexRoute'
import { HomeRoute } from './routes/HomeRoute'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: HomeRoute
    },
    {
        path: "/entity/:entity",
        component: EntityIndexRoute,
        props: true
    },
    {
        path: "/entity/:entity/create",
        component: EntityCreateRoute,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
