import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import store from './js/vuex';
import router from './router';
import Jdiv from './components/Jdiv';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component('Jdiv', Jdiv);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
});
