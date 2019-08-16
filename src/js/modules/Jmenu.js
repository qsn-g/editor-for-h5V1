import Jcomponents from './Jcomponents';

export default class Jmenu extends Jcomponents {
    constructor(webEditor) {
        super(webEditor);
        this.initDom();
    }
    initDom() {
        this.dom.className = 'j-menu';
    }
}
