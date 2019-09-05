
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
                <el-row>
                    <span>选择布局:</span>
                    <span class="button-area">
                        <el-button
                            type="primary"
                            @click="layout(1)"
                            circle
                            icon="el-icon-caret-bottom"
                            size="mini"
                        />
                        <el-button
                            type="primary"
                            @click="layout(2)"
                            circle
                            icon="el-icon-caret-right"
                            size="mini"
                        />
                        <el-button type="primary" circle size="mini" @click="layout(3)">父</el-button>
                    </span>
                </el-row>
                <el-row>
                    <span>通用按钮:</span>
                    <span class="button-area">
                        <el-button
                            type="info"
                            @click="propConfig"
                            circle
                            size="mini"
                            icon="el-icon-s-tools"
                        ></el-button>
                    </span>
                </el-row>
                <el-row style="flex-direction: column;align-items: flex-start">
                    <span>组件库:</span>
                    <span class="component-button">
                        <el-button
                            round
                            size="small"
                            type="warning"
                            v-for="plugin in plugins"
                            :key="plugin.id "
                            @click="addPlugin(plugin.name)"
                        >{{ pluginsName[plugin.name] }}</el-button>
                    </span>
                </el-row>

                <el-button class="upload" type="info" circle icon="el-icon-upload" @click="saveWj"></el-button>
            </div>
        </el-drawer>
        <el-row id="workSpace">
            <Container :cJson="cJson"></Container>
        </el-row>
    </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import { mapActions } from 'vuex';
import Vue from 'vue';
import { post } from '@/js/ajax';
import eventBus from '@/js/eventBus';
import { sendError, sendSuccess } from '@/js/msgBox';
import Container from '@/plugins/Jcontainer';
import { getPluginsFromContext, findFJson, findJson } from '../js/util';
import pluginsName from '../pluginsName.json';

const localRq = require.context('../plugins', true, /\.vue$/);
const plugins = getPluginsFromContext(localRq);
Object.keys(plugins).forEach((item) => {
    Vue.component(item, plugins[item]);
});
export default {
    name: 'editor',
    data() {
        return {
            id: '',
            drawer: false,
            dialogFormVisible: false,
            plugins,
            pluginsName,
            cJson: {},
        };
    },
    components: { Container },
    beforeMount() {
        const { _id, webName, webJson } = this.$route.params;
        if (!_id && !webName) {
            this.$router.push({
                name: 'webTable',
            });
            return;
        }
        this.id = _id;
        this.cJson = webJson;
        this.$store.state.webJson = webJson;
        this.mouseMove();
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
        ...mapActions([
            'resetFocus',
            'resetComponents',
            'resetWebJson',
            'setFocus',
        ]),
        layout(index) {
            const id = this.$store.state.focusElem.id;
            const elem = id
                ? document.getElementById(id)
                : document.getElementById('workSpace');
            let component;
            findJson(id, (json) => {
                component = json;
            });
            if (index === 1) {
                elem.style.flexDirection = 'column';
                component.options.style['flex-direction'] = 'column';
            } else if (index === 2) {
                elem.style.flexDirection = 'row';
                component.options.style['flex-direction'] = 'row';
            } else if (index === 3) {
                // 寻找父组件
                try {
                    if (!id) {
                        sendError('请选择子组件');
                        return;
                    }
                    let fatherId = null;
                    findFJson(id, (struct) => {
                        fatherId = struct.id;
                    });
                    const fatherComponent = this.$store.state.componentList.find(
                        item => item.id === fatherId,
                    );
                    this.setFocus(fatherComponent);
                } catch (e) {
                    sendError('该组件没有父组件');
                    this.resetFocus();
                }
            }
        },
        initEventBus() {
            eventBus.$on('openDialog', this.openDialog);
        },
        removeEventBus() {
            eventBus.$off('openDialog', this.openDialog);
        },
        addPlugin(name) {
            const componentObj = {
                name,
            };
            const focusElem = this.$store.state.focusElem;
            if (!focusElem.id || !focusElem.struct.childNodes) {
                sendError('该组件无法添加子组件');
                return;
            }
            focusElem.childNodes.push(componentObj);
        },
        mouseMove() {
            document.onmousemove = (e) => {
                if (e.clientX + 20 >= window.innerWidth) {
                    this.drawer = true;
                }
            };
            document.oncontextmenu = (e) => {
                this.resetFocus();
                e.preventDefault();
            };
        },
        propConfig() {
            const focusElem = this.$store.state.focusElem;
            if (!focusElem.id) {
                sendError('请选择正确组件');
                return;
            }
            focusElem.configVisible = true;
        },
        async createPage() {
            const { webName } = this.$route.params;
            const res = await post({
                url: '/newEditor',
                data: {
                    webName,
                },
            });
            return res.data._id;
        },
        async saveWj() {
            try {
                if (!this.id) {
                    this.id = await this.createPage();
                }
                const webJson = this.$store.state.webJson;
                const res = await post({
                    url: '/saveWj',
                    data: {
                        webJson,
                        id: this.id,
                    },
                });
                sendSuccess(res.data);
            } catch (e) {
                sendError(e);
            }
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
    display: flex;
    flex-direction: row;
    align-items: center;
}
.content .button-area {
    margin-left: 5px;
}
.component-button {
    flex-wrap: wrap;
    display: flex;
}
.component-button .el-button {
    margin-top: 10px;
}
#workSpace {
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
}
</style>
