import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        componentList: [],
        focusElem: null,
        idArr: [],
    },
    mutations: {
        insertComponent(state, info) {
            state.componentList.push(info);
        },
        resetComponents(state) {
            state.componentList = [];
        },
        setFocus(state, type) {
            state.focusElem = type;
        },
        resetFocus(state) {
            state.focusElem = null;
        },
        insertId(state, id) {
            state.idArr.push(id);
        },
        clearId(state) {
            state.idArr = [];
        },
    },
    actions: {
        resetComponents({ commit }) {
            commit('resetComponents');
        },
        insertComponent({ commit }, info) {
            commit('insertComponent', info);
        },
        setFocus({ commit }, type) {
            commit('setElement', type);
        },
        resetFocus({ commit }) {
            commit('resetFocus');
        },
        insertId({ commit }, type) {
            commit('insertId', type);
        },
        clearId({ commit }) {
            commit('clearId');
        },
    },
});
