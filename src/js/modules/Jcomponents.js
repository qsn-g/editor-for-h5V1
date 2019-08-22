import { sendError } from '../msgBox';
import store from '../vuex';
import { randomId } from '../util';

export default class Jcomponents {
    constructor(webEditor) {
        this.dom = document.createElement('div');
        this.webEditor = webEditor;
        this.childNodes = [];
        this.fatherNode = null;
        this.init();
    }
    init() {
        this.appendDom();
        this.bindListener();
    }
    appendDom() {
        try {
            const idArr = store.state.idArr;
            this.webEditor.allComponents.push(this);
            this.id = randomId(idArr);
            this.dom.id = this.id;
            this.dom.tabIndex = -1;
            store.commit('insertId', this.id);
            const focusElem = store.state.focusElem;
            if (focusElem === null) {
                document.getElementById('workSpace').appendChild(this.dom);
                this.webEditor.webJson.childNodes.push(this);
            } else {
                const fatherDom = document.getElementById(focusElem);
                const allComponents = this.webEditor.allComponents;
                this.fatherNode = allComponents.find(elem => elem.id === focusElem);
                this.fatherNode.childNodes.push(this);
                fatherDom.appendChild(this.dom);
            }
        } catch (error) {
            sendError('请右击去焦');
        }
    }
    bindListener() {
        this.dom.onfocus = () => {
            store.commit('setFocus', this.id);
        };
    }
}
