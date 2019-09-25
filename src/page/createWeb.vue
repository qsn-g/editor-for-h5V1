<template>
    <div>
        <div class="input-id">
            <el-input v-model="input" placeholder="请输入生成页面id">
                <span slot="prepend">页面id</span>
                <el-button @click="createWeb" slot="append">
                    <i class="el-icon-refresh"></i>
                    生成
                </el-button>
            </el-input>
        </div>
        <div class="result-link">
            <span>页面链接:</span>
            <el-link :href="result" target="_blank">{{ result }}</el-link>
        </div>
    </div>
</template>

<script>
import { sendWarm } from '@/js/msgBox';

export default {
    data() {
        return {
            input: '',
            result: '',
        };
    },
    methods: {
        createWeb() {
            if (!this.input || !/^\w+$/.test(this.input)) {
                sendWarm('请输入正确页面id');
                this.loading = false;
                return;
            }
            const { origin } = location;
            this.result = `${origin}/#/getWebUI?id=${this.input}`;
        },
    },
};
</script>

<style scoped>
.el-input {
    width: 50%;
}
.input-id {
    margin-top: 15%;
    text-align: center;
}
.result-link {
    margin-top: 50px;
    text-align: center;
}
.result-link span {
    font-size: 14px;
    color: #909399;
}
</style>
