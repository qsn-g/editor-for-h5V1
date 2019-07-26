import Vue from 'vue';
import Router from 'vue-router';
import webTable from '../components/webTable';
import webEditor from '../components/editor';

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
    ],
});
