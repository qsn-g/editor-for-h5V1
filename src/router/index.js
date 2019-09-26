import Vue from 'vue';
import Router from 'vue-router';
// 因组件较多，使用组件懒加载
const webEditor = () => import('../page/editor.vue');
const webTable = () => import('../page/webTable.vue');
const webUI = () => import('../page/webUI');
const introduce = () => import('../page/introduce.vue');
const createWeb = () => import('../page/createWeb.vue');

Vue.use(Router);

export default new Router({
    routes: [
        {
            component: webTable,
            path: '/webTable',
            name: 'webTable',
        },
        {
            component: webEditor,
            path: '/webEditor',
            name: 'webEditor',
        },
        {
            component: webUI,
            path: '/getWebUI',
            name: 'getWebUI',
        },
        {
            component: createWeb,
            path: '/createWeb',
            name: 'createWeb',
        },
        {
            component: introduce,
            path: '/introduce',
            name: 'introduce',
        },
    ],
});
