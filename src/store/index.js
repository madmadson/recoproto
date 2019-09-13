import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import users from './modules/users'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        users
    }
})