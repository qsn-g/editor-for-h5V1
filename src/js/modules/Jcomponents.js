import store from '../vuex';
import { randomId } from '../util';

export default class Jcomponents {
    constructor(className) {
        this.dom = document.createElement('div');
        this.dom.className = className;
        this.init();
    }
    init() {
        this.appendDom();
        this.bindListener();
    }
    appendDom() {
        const idArr = store.state.idArr;
        this.id = randomId(idArr);
        this.dom.id = this.id;
        this.dom.tabIndex = -1;
        store.commit('insertId', this.id);
        const focusElem = store.state.focusElem;
        if (focusElem === null) {
            document.getElementById('workSpace').appendChild(this.dom);
        } else {
            const fatherDom = document.getElementById(focusElem);
            fatherDom.appendChild(this.dom);
        }
    }
    bindListener() {
        this.dom.onmousedown = this.drag;
        this.dom.onfocus = () => {
            store.commit('setFocus', this.id);
        };
    }
}
