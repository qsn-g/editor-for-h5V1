
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
                    <el-button
                        v-for="component in allComponents"
                        :key="component._name"
                        @click="new component.fun(webEditor)"
                    >{{component.name}}</el-button>
                </el-row>
            </div>
        </el-drawer>
        <el-dialog title="组件属性" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="组件类型">
                    <el-select v-model="form.prop.type" placeholder="请选择组件类型">
                        <el-option v-for="type in form.type" :key="type.id" :value="type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item></el-form-item>
            </el-form>
        </el-dialog>
        <el-row id="workSpace"></el-row>
    </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import { mapActions } from 'vuex';
import WebEditor from '@/js/webEditor';
import allComponents from '@/js/config/cConfig';
import eventBus from '@/js/eventBus';

export default {
    data() {
        return {
            webEditor: null,
            drawer: false,
            allComponents,
            dialogFormVisible: false,
            form: {
                type: [],
                prop: {},
            },
        };
    },
    beforeMount() {
        const { _id, webName } = this.$route.params;
        if (!_id && !webName) {
            this.$router.push({
                name: 'webTable',
            });
            return;
        }
        this.webEditor = new WebEditor({ webName, webId: _id });
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
        this.clearId();
        this.removeEventBus();
    },
    methods: {
        ...mapActions(['resetFocus', 'clearId']),
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
        openDialog(component) {
            this.dialogFormVisible = true;
            this.form.type = allComponents.find(
                c => c._name === component.class,
            ).type;
            this.form.prop = component.prop;
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
