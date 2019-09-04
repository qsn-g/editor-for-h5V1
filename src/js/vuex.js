import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        componentList: [],
        focusElem: {},
        webJson: {},
    },
    mutations: {
        resetWebJson(state) {
            state.webJson = {};
        },
        insertComponent(state, info) {
            state.componentList.push(info);
        },
        resetComponents(state) {
            state.componentList = [];
        },
        setFocus(state, elem) {
            state.componentList.forEach((item) => {
                item.isFocus = false;
            });
            elem.isFocus = true;
            state.focusElem = elem;
        },
        resetFocus(state) {
            state.componentList.forEach((item) => {
                item.isFocus = false;
            });
            state.focusElem = {};
        },
    },
    actions: {
        resetWebJson({ commit }) {
            commit('resetWebJson');
        },
        resetComponents({ commit }) {
            commit('resetComponents');
        },
        insertComponent({ commit }, info) {
            commit('insertComponent', info);
        },
        setFocus({ commit }, elem) {
            commit('setFocus', elem);
        },
        resetFocus({ commit }) {
            commit('resetFocus');
        },
    },
});
