import VueCompositionAPI from '@vue/composition-api'
import Vue from 'vue'
import { App } from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
