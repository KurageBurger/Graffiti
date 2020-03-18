import './bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'

const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App />',
    data: {
      show: true,
    }
  })
}

createApp()