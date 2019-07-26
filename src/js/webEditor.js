import { post } from './ajax';

export default class WebEditor {
    constructor(data) {
        const { webName, webId } = data;
        this.webName = webName;
        this.webId = webId;
        this.webJson = {};
        this.init();
    }
    init() {
        if (!this.webId) {
            this.newEditor();
        } else {
            // this.render();
        }
    }
    async newEditor() {
        const res = await post({
            url: '/newEditor',
            data: {
                webName: this.webName,
            },
        });
        // eslint-disable-next-line no-underscore-dangle
        this.webId = res.data._id;
    }
    async render() {
        const res = await post({
            url: '/getWebJson',
            data: {
                webId: this.webId,
            },
        });
    }
}
