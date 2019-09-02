import nanoid from 'nanoid';
import store from './vuex';
/**
 * 时间戳转为 年-月-日 xx:xx
 * @param {*} timestamp
 */
const timeParser = (timestamp) => {
    const t = new Date(timestamp);
    return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日 ${t.getHours()}:${t.getMinutes() >= 10 ? t.getMinutes() : `0${t.getMinutes()}`}`;
};

const randomId = (arr) => {
    const allWebJson = arr || [];
    let res = nanoid();
    const r = allWebJson.find(item => item.id === res);
    if (r) {
        res = randomId(arr);
    }
    return res;
};

const getPluginsFromContext = (context) => {
    const res = {};
    context
        .keys()
        .map(context)
        .forEach((a) => {
            res[a.default.name] = a.default;
        });
    return res;
};

// eslint-disable-next-line consistent-return
const addJson = (webJson, fatherId, struct) => {
    if (webJson.id === fatherId) {
        webJson.childNodes.push(struct);
        return true;
    }
    if (webJson.childNodes) webJson.childNodes.some(item => addJson(item, fatherId, struct));
};
const drawWeb = (struct, component) => {
    component.$data.struct = struct;
};
const initWeb = (component) => {
    const struct = {
        name: component.name,
        id: component.id,
        options: {},
    };
    if (component.name === 'Jcontainer') struct.childNodes = [];
    return struct;
};
const cbToWJ = (struct) => {
    const webJson = store.state.webJson;
    if (webJson.id) {
        const fatherElem = store.state.focusElem;
        addJson(store.state.webJson, fatherElem.id, struct);
    } else {
        store.state.webJson = struct;
    }
};
export { timeParser, randomId, getPluginsFromContext, drawWeb, initWeb, cbToWJ };
