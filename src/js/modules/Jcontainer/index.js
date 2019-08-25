import Jcomponents from '../Jcomponents';
import './container.css';

export default class Jcontainer extends Jcomponents {
    constructor(webEditor) {
        super(webEditor);
        this.class = 'Jcontainer';
        this.initDom();
    }
    initDom() {
        this.dom.ondblclick = null;
        const className = 'j-container';
        this.dom.className = className;
        return this;
    }
}
