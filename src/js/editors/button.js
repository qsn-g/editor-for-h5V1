import { jbutton } from '../config.json';

const Jbutton = (o) => {
    const prop = Object.assign(jbutton, o);
    return `<el-button></el-button>`;
};


export default Jbutton;
