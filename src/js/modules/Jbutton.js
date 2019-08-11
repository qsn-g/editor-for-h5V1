import Jcomponents from './Jcomponents';

export default class Jbutton extends Jcomponents {
    constructor(className) {
        super(className);
        this.initDom();
    }
    initDom() {
        this.dom.className = 'el-button';
    }
}
