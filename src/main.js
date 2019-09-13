import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
// add this to your local setup 
import firebaseConfig from '../firebaseConfig.json'

Vue.config.productionTip = false


firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
