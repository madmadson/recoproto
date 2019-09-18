import { shallowMount } from '@vue/test-utils'

import Vue from 'vue';
import Vuex from 'vuex'
import Vuetify from 'vuetify';
import Navbar from '@/components/Navbar'
import VueRouter from 'vue-router'

Vue.use(Vuetify, Vuex, VueRouter)

describe('Navbar.vue', () => {

    let mockStore
    let wrapper
    let getters
    let mockRouter
    
    beforeEach(() => {
        getters = {
            'ui/availableThemes': ['dark', 'light'],
            'ui/themeIsDark': true
        }
        mockStore = {
            dispatch: jest.fn(),
            getters
        }
        mockRouter = {
            push: jest.fn(),
        }
        wrapper = shallowMount(Navbar, {
            mocks: {
                $store: mockStore,
                $router: mockRouter
            }
        })
    })
    
    it('test creation of navbar', () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith("ui/SUBSCRIBE_THEME")
    })

    it('test destruction of navbar', () => {
        wrapper.destroy()
        expect(mockStore.dispatch).toHaveBeenCalledWith("ui/UNSUBSCRIBE_THEME")
    })

    it('test select theme',  () => {
        // click the button in the toolbar
        wrapper.find('#button-select-theme').vm.$emit('click')
        // click the menu entry 
        wrapper.find('#select-theme-item-light').vm.$emit('click')
        expect(mockStore.dispatch).toHaveBeenCalledWith("ui/SET_THEME", "light")
    })

    it('test navigation',  () => {
        // click the 
        wrapper.find('#navigation-Home').vm.$emit('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'Home'})
        wrapper.find('#navigation-Products').vm.$emit('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'Products'})
    })

})
