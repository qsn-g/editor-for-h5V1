
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
                <h4>当前焦点: {{$store.state.focusElem.id ? '已聚焦' : '无'}}</h4>
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
                    <el-button
                        v-for="plugin in plugins"
                        :key="plugin.id "
                        @click="addPlugin"
                    >{{ plugin.name }}</el-button>
                </el-row>
            </div>
        </el-drawer>
        <el-row id="workSpace">
            <Container :cJson="test" :plugins="plugins"></Container>
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
const test2 = {};
export default {
    name: 'editor',
    data() {
        return {
            drawer: false,
            dialogFormVisible: false,
            plugins,
            test: test2,
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
        document.oncontextmenu = (e) => {
            this.resetFocus();
            e.preventDefault();
        };
        this.initEventBus();
    },
    beforeDestroy() {
        document.onmousemove = null;
        this.resetFocus();
        this.resetWebJson();
        this.resetComponents();
        this.removeEventBus();
    },
    methods: {
        ...mapActions(['resetFocus', 'resetComponents', 'resetWebJson']),
        layout(index) {
            const id = this.$store.state.focusElem.id;
            const elem = id
                ? document.getElementById(id)
                : document.getElementById('workSpace');
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
        addPlugin(e) {
            const componentObj = {
                name: e.target.innerText,
            };
            const focusElem = this.$store.state.focusElem;
            if (!focusElem.id || !focusElem.childNodes) return;
            focusElem.childNodes.push(componentObj);
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
