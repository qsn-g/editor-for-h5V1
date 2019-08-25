import Jcomponents from '../Jcomponents';
import './button.css';

export default class Jbutton extends Jcomponents {
    constructor(webEditor, prop = {}) {
        super(webEditor);
        prop.type = prop.type || '';
        prop.text = prop.text || '';
        this.prop = prop;
        this.class = 'Jbutton';
        this.initDom();
    }
    initDom() {
        let className = 'j-button';
        className += ` ${this.prop.type}`;
        this.dom.innerText = this.prop.text;
        this.dom.className = className;
        return this;
    }
    setProp(prop) {
        prop.text = prop.text || this.prop.text;
        prop.type = prop.type || this.prop.type;
        this.prop = prop;
        this.dom.className = `j-button ${this.prop.type}`;
        this.dom.innerText = this.prop.text;
        return this;
    }
}
