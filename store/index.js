import axios from 'axios'
export const state = () => ({
    files: [],
    groups: [],
    host: 'localhost'
})

export const getters = {

}

export const mutations = {
    // Groups
    SET_GROUPS(state, groups) {
        state.groups = groups
    },
    ADD_GROUPS(state, payload) {
        state.groups.push(payload)
        console.log(state.groups)
    },
    // Files
    SET_FILES(state, files) {
        state.files = files
    },
    ADD_FILES(state, payload) {
        state.files.push(payload)
        console.log(state.files)
    },
    UPDATE_FILES(state, payload) {
        // let index = state.departments.map(el => el._id).indexOf(payload._id)
        // state.departments[index] = payload
        // console.log(state.departments)
    },
}

export const actions = {
    async get_files({ commit }) {
        axios
            .get(`http://localhost:8080/api/files`)
            .then((response) => {
                commit('SET_FILES', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            .then(() => {
                // always executed
            })
    },
    async get_groups({ commit }) {
        axios
            .get(`http://localhost:8080/api/groups`)
            .then((response) => {
                commit('SET_GROUPS', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            .then(() => {
                // always executed
            })
    },
}