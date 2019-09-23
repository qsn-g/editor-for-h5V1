<template>
    <Jdiv
        :id="id"
        class="j-menu"
        :class="{'is-focus':isFocus && isEditor}"
        :style="struct.options.style"
    >
        <template slot="input">
            <el-menu
                :background-color="struct.options.menuValue.bgColor"
                :text-color="struct.options.menuValue.textColor"
                :active-text-color="struct.options.menuValue.activeColor"
                :mode="`${struct.options.menuValue.mode? 'horizontal' : 'vertical'}`"
            >
                <el-menu-item
                    v-for="item in struct.options.menuValue.linkData"
                    :key="item.id"
                    @click="clickMenuItem(item)"
                >{{item.value}}</el-menu-item>
            </el-menu>
            <el-dialog :title="`设置菜单`" v-if="configVisible" :visible.sync="configVisible">
                <div class="select-model">
                    <span>选择模式:</span>
                    <el-switch
                        v-model="setValue.mode"
                        inactive-color="#13ce66"
                        active-text="水平"
                        inactive-text="垂直"
                    ></el-switch>
                </div>
                <div class="select-color">
                    <span>选择背景色:</span>
                    <el-color-picker v-model="setValue.bgColor" show-alpha></el-color-picker>
                    <span>选择文字色:</span>
                    <el-color-picker v-model="setValue.textColor" show-alpha></el-color-picker>
                    <span>选择活跃色:</span>
                    <el-color-picker v-model="setValue.activeColor" show-alpha></el-color-picker>
                </div>
                <div link-area>
                    <el-table border :data="setValue.linkData">
                        <el-table-column label="按钮名称">
                            <template slot-scope="{ row }">
                                <label
                                    :contenteditable="uData"
                                    @dblclick="() => {uData = true}"
                                >{{ row.value }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="链接地址">
                            <template slot-scope="{ row }">
                                <label
                                    :contenteditable="uData"
                                    @dblclick="() => {uData = true}"
                                >{{ row.link }}</label>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="deleteMenu(scope.$index, setValue.linkData)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div slot="footer">
                    <div class="new-area">
                        <el-input size="small" v-model="addName" placeholder="请输入导航名"></el-input>
                        <el-input
                            style="width: 300px"
                            size="small"
                            v-model="addLink"
                            placeholder="请输入链接"
                        ></el-input>
                        <el-button size="small" @click="addMenu" type="info">添加</el-button>
                    </div>
                    <el-button size="small" @click="onCancel">取消</el-button>
                    <el-button size="small" @click="onSave" type="primary">保存</el-button>
                </div>
            </el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';

export default {
    name: 'Jmenu',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jmenu',
            uData: false,
            addName: '',
            addLink: '',
            setValue: {
                mode: false,
                bgColor: '',
                textColor: '',
                activeColor: '#409eff',
                linkData: [],
            },
            oldValue: {},
        };
    },
    beforeMount() {
        if (!this.struct.options.menuValue) {
            this.struct.options.menuValue = {
                mode: false,
                bgColor: '',
                textColor: '',
                activeColor: '#409eff',
                linkData: [],
            };
        }
        this.setValue = this.copyStruct();
    },
    methods: {
        copyStruct() {
            const t = this.struct.options.menuValue;
            return {
                mode: t.mode,
                bgColor: t.bgColor,
                textColor: t.textColor,
                activeColor: t.activeColor,
                linkData: [...t.linkData],
            };
        },
        onSave() {
            this.struct.options.menuValue = this.setValue;
            this.setValue = this.copyStruct();
            this.configVisible = false;
        },
        onCancel() {
            this.setValue = this.copyStruct();
            this.configVisible = false;
        },
        deleteMenu(index, arr) {
            arr.splice(index, 1);
        },
        clickMenuItem(item) {
            window.open(item.link);
        },
        addMenu() {
            this.setValue.linkData.push({
                value: this.addName,
                link: this.addLink,
            });
            this.addName = '';
            this.addLink = '';
        },
    },
};
</script>

<style scoped>
.el-menu {
    width: 100%;
}
.select-color {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
}
.select-color .el-color-picker {
    margin-left: 20px;
    margin-right: 30px;
}
.new-area {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.el-input {
    width: 120px;
}
</style>
