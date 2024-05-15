import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import './uni.promisify.adaptor'
import upgrade from './components/upgrade/upgrade.vue'
import formworkVue from './components/formwork/formwork.vue'
Vue.component('formwork', formworkVue)
Vue.component('upgrade', upgrade)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif