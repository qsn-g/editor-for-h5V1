/* eslint-disable no-param-reassign */
import Jcomponents from '../Jcomponents';
import './table.css';

export default class Jtable extends Jcomponents {
    constructor(webEditor, prop = {}) {
        super(webEditor);
        prop.type = prop.type || '';
        prop.header = prop.header || [];
        prop.tableData = prop.tableData || [];
        this.prop = prop;
        this.class = 'Jtable';
        this.initDom();
    }
    initDom() {
        let className = 'j-table';
        className += ` ${this.prop.type}`;
        this.dom.className = className;
        this.initData();
        return this;
    }
    initData(tableData, header) {
        let theader = '';
        let tbody = '';
        tableData = tableData || this.prop.tableData;
        header = header || this.prop.header;
        header.forEach((headerElem) => {
            theader += `<th>${headerElem}</th>`;
        });
        theader = `<thead><tr>${theader}</tr></thead>`;
        const setRowDom = (elem) => {
            let rowDom = '';
            header.forEach((headerElem) => {
                rowDom += `<td>${elem[headerElem]}</td>`;
            });
            return `<tr class ='tableItem'>${rowDom}</tr>`;
        };
        tableData.forEach((elem) => {
            tbody += setRowDom(elem);
        });
        tbody = `<tbody>${tbody}</tbody>`;
        let resultDom = theader + tbody;
        resultDom = `<table>${resultDom}</table>`;
        this.dom.innerHTML = resultDom;
        return this;
    }
    setProp(prop) {
        prop.header = prop.header || this.prop.header;
        prop.tableData = prop.tableData || this.prop.tableData;
        this.prop = prop;
        this.initData(this.prop.tableData, this.prop.header);
        return this;
    }
}
