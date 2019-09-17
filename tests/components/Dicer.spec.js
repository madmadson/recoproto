import { shallowMount } from '@vue/test-utils'
import Dicer from '@/components/Dicer.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify)

describe('Dicer.vue', () => {
    it('Render Dicer', () => {
        const dicer = '123'
        const wrapper = shallowMount(Dicer, {
            propsData: { dicer }
        })
        expect(wrapper.text()).toMatch(dicer)
    })
})
