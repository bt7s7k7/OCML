import VueCompositionAPI from '@vue/composition-api'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { App } from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')