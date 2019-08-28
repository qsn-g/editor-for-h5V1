import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        componentList: [],
        focusElem: null,
        idArr: [],
        webJson: {},
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
        funToWJ(state, cb) {
            cb(state.webJson);
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
        funToWJ({ commit }, cb) {
            commit('funToWJ', cb);
        },
    },
});
