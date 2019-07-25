<template>
    <div id="webTable">
        <el-row class="buttonList">
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="newEditor(-1, { webName: '新建编辑' })"
                circle>
            </el-button>
        </el-row>
        <el-row class="table">
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
                    <template slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit"></el-button>
                        <el-button circle type="danger" icon="el-icon-delete" @click="rtest(scope.row._id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import { post } from '@/js/ajax';
import WebEditor from '@/js/webEditor';
import { timeParser } from '@/js/util';
import { sendError, sendSuccess } from '../js/msgBox';

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
            try {
                const res = await post({
                    url: '/getWebList',
                });
                res.data.forEach((elem) => {
                    this.webList.push({
                        ...elem,
                        date: timeParser(elem.mTime),
                    });
                });
            } catch (err) {
                sendError('网络出错');
            }
        },
        newEditor(index, webInfo) {
        // eslint-disable-next-line no-new
            new WebEditor(webInfo);
        },
        rtest(webId) {
            post({
                url: '/removeWeb',
                data: {
                    webId,
                },
            }).then(() => {
                sendSuccess('删除成功');
            });
        },
    },
};
</script>

<style scoped>
#webTable {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow: auto;
}
.buttonList .el-button{
    margin: 10px 0px 10px 15px;
}
.el-table {
    font-family: Arial, Helvetica, sans-serif;
    color: #909399;
    font-size: 13px;
}
</style>
