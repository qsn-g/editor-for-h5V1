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
            <el-dialog v-loading="loading" :title="`设置表格`" :visible.sync="configVisible">
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
                    <el-upload
                        action
                        style="display: inline-block"
                        :show-file-list="false"
                        :http-request="uploadExcel"
                    >
                        <el-button type="text">上传excel文件</el-button>
                    </el-upload>
                    <el-button size="small" @click="onCancel">取消</el-button>
                    <el-button size="small" @click="onSave" type="primary">保存</el-button>
                </div>
            </el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import { sendError } from '@/js/msgBox';
import XLSX from 'xlsx';

export default {
    name: 'Jtable',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jtable',
            sheaders: [],
            headers: [],
            dataSource: [],
            loading: false,
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
        uploadExcel(fileInfo) {
            try {
                this.loading = true;
                const { file } = fileInfo;
                this.headers = [];
                this.dataSource = [];
                this.readExcel(file, (data) => {
                    const sheet = data.Sheets[data.SheetNames[0]];
                    Object.keys(sheet).forEach((key) => {
                        if (key !== '!ref') {
                            if (key[1] === '1') {
                                this.headers.push(sheet[key].w);
                            } else if (!this.dataSource[key[1] - 2]) {
                                this.dataSource.push({
                                    [sheet[`${key[0]}1`].w]: sheet[key].w,
                                });
                            } else if (this.dataSource[key[1] - 2]) {
                                this.dataSource[key[1] - 2][
                                    sheet[`${key[0]}1`].w
                                ] = sheet[key].w;
                            }
                        }
                    });
                    this.loading = false;
                });
            } catch (error) {
                this.loading = false;
                sendError(error);
            }
        },
        readExcel(file, cb) {
            try {
                const fr = new FileReader();
                fr.onload = (e) => {
                    const { result } = e.target;
                    const fileContent = XLSX.read(result, { type: 'binary' });
                    if (cb) cb(fileContent);
                };
                fr.readAsBinaryString(file);
            } catch (e) {
                sendError(e);
            }
        },
    },
};
</script>

<style scoped>
.el-table {
    overflow: auto;
}
</style>
