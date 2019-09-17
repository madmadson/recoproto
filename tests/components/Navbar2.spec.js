import { mount, shallowMount, createLocalVue} from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import Vue from 'vue';
import Vuex from 'vuex'
import Vuetify from 'vuetify';
Vue.use(Vuetify)

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Navbar.vue', () => {

    let actions
    let store
    let wrapper
    let getters

    beforeEach(() => {
        getters = {
            'ui/availableThemes': () => ['dark', 'light']
        }
        actions = {
            'ui/SUBSCRIBE_THEME': jest.fn(),
            'ui/SET_THEME': jest.fn(),
            actionInput: jest.fn()
        }
        store = new Vuex.Store({
            modules: {
                ui: {
                    actions,
                    getters
                }
            }
        })

        wrapper = shallowMount(Navbar, { 
            store, 
            localVue 
        })
    })

    it('Render Navbar', async () => {
        console.log(wrapper.html());
        const selector = wrapper.find('#button-themes');
        await selector.trigger('click')
        console.log(wrapper.html());
        const selector2 = wrapper.find('#select-theme-item-dark');
        console.log(selector2.html());
        await selector2.trigger('click')
        //expect(actions['ui/SET_THEME']).toHaveBeenCalled()
        expect(actions['ui/SET_THEME'].mock.calls).toHaveLength(1)
    })
})
