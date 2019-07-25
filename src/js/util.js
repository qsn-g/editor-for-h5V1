const timeParser = (timestamp) => {
    const t = new Date(timestamp);
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
};

export {
    timeParser,
};
