
<template>
    <div class="editor">
        <el-drawer
            title="工具栏"
            size="18%"
            :append-to-body="true"
            :visible.sync="drawer"
            direction="rtl"
        >
            <div class="content">
                <h4>当前焦点: {{$store.state.focusElem ? '已聚焦' : '无'}}</h4>
                <el-row style="display:flex;justify-content:space-between">
                    <span>选择布局:</span>
                    <span>
                        <el-button
                            @click="layout(1)"
                            circle
                            icon="el-icon-caret-bottom"
                            size="mini"
                        />
                        <el-button
                            @click="layout(2)"
                            circle
                            icon="el-icon-caret-right"
                            size="mini"
                        />
                    </span>
                </el-row>
                <el-row>
                    <el-button v-for="plugin in plugins" :key="plugin.id ">{{ plugin.name }}</el-button>
                </el-row>
            </div>
        </el-drawer>
        <el-row id="workSpace">
            <Container :plugins="plugins"></Container>
        </el-row>
    </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import { mapActions } from 'vuex';
import Vue from 'vue';
import eventBus from '@/js/eventBus';
import Container from '@/plugins/Jcontainer';
import { getPluginsFromContext } from '../js/util';

const localRq = require.context('../plugins', true, /\.vue$/);
const plugins = getPluginsFromContext(localRq);
Object.keys(plugins).forEach((item) => {
    Vue.component(item, plugins[item]);
});

export default {
    name: 'editor',
    data() {
        return {
            drawer: false,
            dialogFormVisible: false,
            plugins,
        };
    },
    components: { Container },
    beforeMount() {
        const { _id, webName } = this.$route.params;
        if (!_id && !webName) {
            this.$router.push({
                name: 'webTable',
            });
            return;
        }
        document.onmousemove = (e) => {
            if (e.clientX + 20 >= window.innerWidth) {
                this.drawer = true;
            }
        };
        this.initEventBus();
    },
    beforeDestroy() {
        document.onmousemove = null;
        this.resetFocus();
        this.resetComponents();
        this.removeEventBus();
    },
    methods: {
        ...mapActions(['resetFocus', 'resetComponents']),
        layout(index) {
            const id = this.$store.state.focusElem;
            const elem =
                id === null
                    ? document.getElementById('workSpace')
                    : document.getElementById(id);
            if (index === 1) {
                elem.style.flexDirection = 'column';
            } else if (index === 2) {
                elem.style.flexDirection = 'row';
            }
        },
        initEventBus() {
            eventBus.$on('openDialog', this.openDialog);
        },
        removeEventBus() {
            eventBus.$off('openDialog', this.openDialog);
        },
    },
};
</script>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
}
.content {
    margin: 0 15px 0 15px;
    display: flex;
    flex-direction: column;
}
.content .el-row {
    margin-top: 10px;
}
#workSpace {
    display: flex;
    flex-direction: row;
    flex: 1;
}
</style>
