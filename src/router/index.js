import Vue from 'vue';
import Router from 'vue-router';
import webTable from '../components/webTable';
import webEditor from '../components/editor';
import webUI from '../components/webUI';

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
    ],
});
