import Jcomponents from '../Jcomponents';
import './container.css';

export default class Jcontainer extends Jcomponents {
    constructor(webEditor) {
        super(webEditor);
        this.initDom();
    }
    initDom() {
        const className = 'j-container';
        this.dom.className = className;
        return this;
    }
}
