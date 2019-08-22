import Jcomponents from '../Jcomponents';
import './table.css';

export default class Jtable extends Jcomponents {
    constructor(webEditor, prop) {
        super(webEditor);
        prop.type = prop.type || '';
        prop.header = prop.header || [];
        prop.tableData = prop.tableData || [];
        this.prop = prop;
        this.initDom();
    }
    initDom() {
        let className = 'j-table';
        className += ` ${this.prop.type}`;
        this.dom.className = className;
        this.initData();
    }
    initData(tableData) {
        const theader = '';
        const tbody = '';
        tableData = tableData || this.prop.tableData;
        this.prop.tableData.forEach((elem) => {
            const rowDom = '';
        });
        resultDom = `<table>${resultDom}</table>`;
        this.dom.innerHTML = resultDom;
    }
}
