import Vue from 'vue';
import Router from 'vue-router';
import webTable from '../page/webTable';
import webEditor from '../page/editor';
import webUI from '../page/webUI';
import introduce from '../page/introduce';
import createWeb from '../page/createWeb';

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
