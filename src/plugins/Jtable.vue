<template>
    <Jdiv :id="id" class="j-table" :class="{'is-focus':isFocus}">
        <template slot="input">
            <el-table :data="struct.options.dataSource">
                <el-table-column
                    v-for="prop in sheaders"
                    :key="prop.id"
                    :label="prop"
                    :prop="prop"
                />
            </el-table>
            <el-dialog :title="`设置表格`" :visible.sync="configVisible">
                <el-table border :data="dataSource">
                    <el-table-column
                        v-for="prop in headers"
                        :key="prop.id"
                        :prop="prop"
                        :label="prop"
                    ></el-table-column>
                    <el-table-column align="center">
                        <template slot="header">
                            <el-button type="text" @click="addHeaders">增加表头</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                @click="deleteRecord(scope.$index, scope)"
                                size="small"
                                type="danger"
                                circle
                            >
                                <i class="el-icon-delete-solid" />
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer">
                    <el-button @click="onCancel">取消</el-button>
                    <el-button @click="onSave" type="primary">保存</el-button>
                </div>
            </el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';

export default {
    name: 'Jtable',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jtable',
            sheaders: [],
            headers: [],
            dataSource: [],
        };
    },
    beforeMount() {
        if (!this.struct.options.dataSource) {
            this.struct.options.dataSource = [];
        }
        this.dataSource = this.copyStruct();
        this.changesHeaders();
        this.changeHeaders();
    },
    methods: {
        copyStruct() {
            const arr = [];
            this.struct.options.dataSource.forEach((item) => {
                arr.push({ ...item });
            });
            return arr;
        },
        onCancel() {
            this.configVisible = false;
            this.dataSource = this.copyStruct();
            this.changeHeaders();
        },
        onSave() {
            this.configVisible = false;
            this.struct.options.dataSource = this.dataSource;
            this.dataSource = this.copyStruct();
            this.changesHeaders();
        },
        deleteRecord(index) {
            this.dataSource.splice(index, 1);
        },
        changeHeaders() {
            const dataSource = this.dataSource;
            if (!dataSource[0]) {
                this.headers = [];
                return;
            }
            const res = [];
            Object.keys(dataSource[0]).forEach((item) => {
                res.push(item);
            });
            this.headers = res;
        },
        changesHeaders() {
            const dataSource = this.struct.options.dataSource;
            if (!dataSource[0]) {
                this.sheaders = [];
                return;
            }
            const res = [];
            Object.keys(dataSource[0]).forEach((item) => {
                res.push(item);
            });
            this.sheaders = res;
        },
        async addHeaders() {
            try {
                const res = await this.$prompt('新增表头字段', '提示', {
                    confirmButtonText: '添加',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '表头字段不能为空',
                });
                const { value } = res;
                this.dataSource.forEach((item) => {
                    item[value] = '-';
                });
                this.changeHeaders();
            } catch (e) {
                this.$message.error('取消添加');
            }
        },
    },
};
</script>

<style scoped>
.j-table {
    height: 100%;
    width: 100%;
}
.el-table {
    overflow: auto;
}
</style>
