<template>
    <div>
        <component v-for="item in componentItem" :key="item.key" :is="item.component" :selectType="selectType"></component>
        <button @click="add">12312</button>
    </div>
</template>

<script>
import WebEditor from '@/js/webEditor';
import anyType from './anyType'

export default {
    data() {
        return {
            webEditor: null,
            webJson: {},
            componentItem: [],
            selectType: 'el-table',
        };
    },
    beforeMount() {
        console.log(this)
        const { _id, webName } = this.$route.params;
        if (!_id && !webName) {
            this.$router.push({
                name: 'webTable'
            })
            return;
        }
        this.webEditor = new WebEditor({ webName, webId: _id });
    },
    methods: {
        add() {
            this.componentItem.push({
                component: anyType,
            })
        }
    },
};
</script>

<style scoped>

</style>
