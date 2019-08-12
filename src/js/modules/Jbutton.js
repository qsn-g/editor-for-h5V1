import Jcomponents from './Jcomponents';

export default class Jbutton extends Jcomponents {
    constructor(webEditor) {
        super(webEditor);
        this.initDom();
    }
    initDom() {
        this.dom.className = 'el-button';
    }
}
