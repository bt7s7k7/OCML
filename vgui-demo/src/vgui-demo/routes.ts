import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { EntityIndexRoute } from './routes/EntityIndexRoute'
import { EntityUpdateRoute } from './routes/EntityUpdateRoute'
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
        component: EntityUpdateRoute,
        props: true
    },
    {
        path: "/entity/:entity/update/:id",
        component: EntityUpdateRoute,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
