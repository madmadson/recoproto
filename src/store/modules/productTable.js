import {db} from '@/main';
import fileProducts from '@/data/products'

const state = {
    pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        totalItems: fileProducts.size,
        rowsPerPageItems: [10, 20, 50, 100]
    },
    loading: false,
    products: fileProducts
};

const getters = {
    loading (state) {
        return state.loading
    },
    pagination (state) {
        return state.pagination
    },
    products(state) {
        return state.products
    }
    
};

const actions = {
    SUBSCRIBE_TIME: (context) => {
        context.commit('subscribeTime')
    },
    UNSUBSCRIBE_TIME: (context) => {
        context.commit('unsubscribeTime')
    },

   
}
let unsubscribeFirebaseTime;

const mutations = {
    subscribeTime: () => {
        console.log('subscribe to time.')
        unsubscribeFirebaseTime = db.collection("blub").doc('bla')
                                    .onSnapshot(function(doc) {
                                        console.log(doc.data())
                                    });
    },
    unsubscribeTime: () => {
        console.log('unsubscribe from themeUpdates.')
        unsubscribeFirebaseTime()
    },
    setPagination (state, payload) {
        console.log('set pagination.')
        state.pagination = payload
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}