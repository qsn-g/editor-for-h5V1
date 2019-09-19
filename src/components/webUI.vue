<template>
    <Jcontainer v-loading="!loading" v-if="loading" :cJson="cJson"></Jcontainer>
</template>

<script>
import { post } from '@/js/ajax';
import { sendError } from '@/js/msgBox';

export default {
    data() {
        return {
            loading: false,
            cJson: {},
        };
    },
    async beforeMount() {
        const { hash } = location;
        const id = this.getId(hash);
        if (id) {
            const res = await post({
                url: '/getPageData',
                data: {
                    _id: id,
                },
            });
            if (res.data === -1) {
                sendError('无该编辑页面');
            }
            this.cJson = res.data;
            this.loading = true;
        }
        // const res = post('/getPageData');
    },
    methods: {
        getId(hash) {
            const j = hash.indexOf('id');
            if (j < 0) return false;
            const i = hash.indexOf('id=');
            if (i < 0) {
                sendError('请输入正确参数');
                return false;
            }
            return hash.slice(i + 3);
        },
    },
};
</script>

<style>
</style>
