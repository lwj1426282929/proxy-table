import Vue from 'vue'
import App from './App.vue'
import http from './http'
import instance from './http/config'
import router from './router'
import './plugins/element'

Vue.config.productionTip = false

Vue.use(http, instance)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
