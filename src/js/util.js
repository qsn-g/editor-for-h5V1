import nanoid from 'nanoid';
/**
 * 时间戳转为 年-月-日 xx:xx
 * @param {*} timestamp
 */
const timeParser = (timestamp) => {
    const t = new Date(timestamp);
    return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日 ${t.getHours()}:${t.getMinutes() >= 10 ? t.getMinutes() : `0${t.getMinutes()}`}`;
};

const randomId = (arr) => {
    const idArr = arr || [];
    let res = nanoid();
    while (idArr.includes(res)) {
        res = nanoid();
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
export { timeParser, randomId, getPluginsFromContext };
