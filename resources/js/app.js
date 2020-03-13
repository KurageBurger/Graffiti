import './bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'

var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})