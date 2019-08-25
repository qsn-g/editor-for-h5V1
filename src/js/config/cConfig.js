import Jtable from '../modules/Jtable';
import Jbutton from '../modules/Jbutton';
import Jcontainer from '../modules/Jcontainer';

const allComponents = [
    {
        _name: 'Jcontainer',
        name: '容器',
        fun: Jcontainer,
    },
    {
        _name: 'Jbutton',
        name: '按钮',
        fun: Jbutton,
        type: ['primary', 'danger'],
    },
    {
        _name: 'Jtable',
        name: '表格',
        fun: Jtable,
        type: [],
    },
];

export default allComponents;
