
const state = {
    pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10,
        totalItems: 0,
        rowsPerPageItems: [10, 20, 50, 100]
    },
    loading: false
};

const getters = {
    loading (state) {
        return state.loading
    },
    pagination (state) {
        return state.pagination
    }
    
};

const actions = {
   
}

const mutations = {
    
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}