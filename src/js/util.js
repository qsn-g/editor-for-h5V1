/* eslint-disable consistent-return */
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

/**
 * 随机生成组件的id
 * @param {*} arr
 */
const randomId = (arr) => {
    const allWebJson = arr || [];
    let res = nanoid();
    const r = allWebJson.find(item => item.id === res);
    if (r) {
        res = randomId(arr);
    }
    return res;
};
/**
 * 获取plugins目录下的所有组件
 * @param {*} context
 */
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
/**
 * 增加子组件json
 * @param {*} webJson store中的webJson
 * @param {*} fatherId 在该json结构下childNodes里增加struct
 * @param {*} struct 子组件结构
 */
const addJson = (webJson, fatherId, struct) => {
    if (webJson.id === fatherId) {
        webJson.childNodes.push(struct);
        return true;
    }
    if (webJson.childNodes) webJson.childNodes.some(item => addJson(item, fatherId, struct));
};
/**
 * 查找目标组件id的json结构并执行cb函数
 * @param {*} componentId 组件id
 * @param {*} cb 回调函数
 * @param {*} webJson store中的webJson
 */
const findJson = (componentId, cb, webJson = store.state.webJson) => {
    if (webJson.id === componentId) {
        cb(webJson);
        return true;
    }
    if (webJson.childNodes) webJson.childNodes.some(item => findJson(componentId, cb, item));
};
/**
 * 查找目标组件id的父组件json结构并执行cb函数
 * @param {*} componentId 组件id
 * @param {*} cb 回调函数
 * @param {*} webJson store中的webJson
 */
const findFJson = (componentId, cb, webJson = store.state.webJson) => {
    if (webJson.childNodes && webJson.childNodes.some(item => item.id === componentId)) {
        cb(webJson);
        return true;
    }
    if (webJson.childNodes) webJson.childNodes.some(item => findFJson(componentId, cb, item));
};
/**
 * mixins中若有结构需要重绘
 * @param {*} struct
 * @param {*} component
 */
const drawWeb = (struct, component) => {
    component.$data.struct = struct;
};
/**
 * mixins中若没有结构需要初始化（如添加新组件）
 * @param {*} component
 */
const initWeb = (component) => {
    const struct = {
        name: component.name,
        id: component.id,
        options: {
            style: {},
        },
    };
    if (component.name === 'Jcontainer') struct.childNodes = [];
    return struct;
};
/**
 * 添加新组件时需要对store中的webJson添加结构
 * @param {*} struct
 */
const cbToWJ = (struct) => {
    const webJson = store.state.webJson;
    if (webJson.id) {
        const fatherElem = store.state.focusElem;
        addJson(store.state.webJson, fatherElem.id, struct);
    } else {
        store.state.webJson = struct;
    }
};
export { timeParser, randomId, getPluginsFromContext, drawWeb, initWeb, cbToWJ, findJson, findFJson };
