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
                            icon="el-icon-caret-right"
                            size="mini"
                        />
                        <el-button
                            @click="layout(2)"
                            circle
                            icon="el-icon-caret-bottom"
                            size="mini"
                        />
                    </span>
                </el-row>
                <el-row>
                    <el-button
                        v-for="component in allComponents"
                        :key="component._name"
                    >{{component.name}}</el-button>
                </el-row>
            </div>
        </el-drawer>
        <el-row id="workSpace" @click="test"></el-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import WebEditor from '@/js/webEditor';
import allComponents from '@/js/config/cConfig';

export default {
    data() {
        return {
            webEditor: null,
            drawer: false,
            allComponents,
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
    },
    beforeDestroy() {
        document.onmousemove = null;
        this.resetFocus();
    },
    methods: {
        ...mapActions(['resetFocus']),
        test() {
            /* eslint-disable no-new */
            const testData = [
                {
                    日期: '11',
                    年龄: '12',
                    姓名: '13',
                },
                {
                    日期: '21',
                    年龄: '22',
                    姓名: '23',
                },
                {
                    日期: '31',
                    年龄: '32',
                    姓名: '33',
                },
            ];
        },
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
