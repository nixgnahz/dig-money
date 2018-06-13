import Vue from 'vue'
import App from './App'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  components: {
    App
  },
  template: '<App/>'
})
