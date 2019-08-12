import { post } from './ajax';
import store from './vuex';

export default class WebEditor {
    constructor(data) {
        const { webName, webId } = data;
        this.allComponents = [];
        this.webJson = {
            webId,
            webName,
            childNodes: [],
        };
        this.init();
    }
    init() {
        if (!this.webJson.webId) {
            this.newEditor();
        } else {
            // this.render();
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
            store.commit('resetFocus');
        };
    }
    async newEditor() {
        const res = await post({
            url: '/newEditor',
            data: {
                webName: this.webJson.webName,
            },
        });
        // eslint-disable-next-line no-underscore-dangle
        this.webJson.webId = res.data._id;
    }
    async render() {
        const res = await post({
            url: '/getWebJson',
            data: {
                webId: this.webJson.webId,
            },
        });
        return res;
    }
}
