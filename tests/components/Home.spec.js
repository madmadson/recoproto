import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify)

describe('Home.vue', () => {
    it('Render Home, should be 9 images', () => {
        const wrapper = shallowMount(Home)
        console.log(wrapper.html())
        const images = wrapper.findAll("v-img-stub")
        expect(images.length).toBe(9)
    })
})
