import axios from 'axios';

const post = (params) => {
    const { url, data } = params;
    return axios.post(`/jpi/webEditor${url}`, data);
};

const get = url => axios.get(`/jpi/webEditor${url}`);

export { post, get };
