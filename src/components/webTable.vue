<template>
    <div id="webTable">
        <el-row>
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="newEditor(-1, { webName: '新建编辑' })"
                circle>
            </el-button>
        </el-row>
        <el-row>
            <el-table
                :data="webList"
                :default-sort="{prop: 'mTime', order: 'descending'}">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="date"
                    sortable>
                </el-table-column>
                <el-table-column
                    label="网页名称"
                    sortable>
                    <template slot-scope="scope">
                        <label contenteditable="true">{{scope.row.webName}}</label>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import { post } from '@/js/ajax';
import WebEditor from '@/js/webEditor';
import { timeParser } from '@/js/util';

export default {
    data() {
        return {
            webList: [],
        };
    },
    beforeMount() {
        this.getWebList();
    },
    methods: {
        async getWebList() {
            const res = await post({
                url: '/getWebList',
            });
            res.data.forEach((elem) => {
                this.webList.push({
                    ...elem,
                    date: timeParser(elem.mTime),
                })
            })
        },
        newEditor(index, webInfo) {
            const editor = new WebEditor(webInfo)
        },
    },
};
</script>

<style scoped>

</style>
