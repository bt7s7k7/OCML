import VueCompositionAPI from '@vue/composition-api'
import Vue from 'vue'
import { App } from './App'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
