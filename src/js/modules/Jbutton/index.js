import Jcomponents from '../Jcomponents';
import './button.css';

export default class Jbutton extends Jcomponents {
    constructor(webEditor, prop) {
        super(webEditor);
        prop.type = prop.type || '';
        prop.text = prop.text || '';
        this.prop = prop;
        this.initDom();
    }
    initDom() {
        let className = 'j-button';
        className += ` ${this.prop.type}`;
        this.dom.innerText = this.prop.text;
        this.dom.className = className;
        return this;
    }
    setValue(value) {
        this.dom.innerText = value;
        return this;
    }
}
