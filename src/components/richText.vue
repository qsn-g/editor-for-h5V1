<template>
    <div class="my-rich-text">
        <div class="header">
            <el-color-picker size="small" v-model="value.style.color" />
            <el-button size="small">粗</el-button>
        </div>
        <el-input :style="value.style" type="textarea" v-model="value.text"></el-input>
        <div>
            <el-button size="small" type="primary" @click="sendComment">发布</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({
                text: '',
                style: {
                    color: '#000000',
                },
            }),
        },
        sendComment: {
            type: Function,
            default: () => {},
        },
    },
    watch: {
        value: {
            handler(newValue) {
                this.$emit('input', newValue);
            },
            deep: true,
        },
    },
};
</script>

<style >
.my-rich-text {
    display: flex;
    flex-direction: column;
}
.my-rich-text .header {
    display: flex;
    align-items: center;
}
.my-rich-text .header .el-button {
    border: none;
    border-radius: 0px;
}
.my-rich-text .header .el-color-picker__trigger {
    border: none;
}
.my-rich-text .el-textarea .el-textarea__inner {
    border-radius: 0px;
    color: inherit;
}
</style>
