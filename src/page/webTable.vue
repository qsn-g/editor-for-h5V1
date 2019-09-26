<template>
    <div v-loading="loading" id="webTable">
        <el-row class="buttonList">
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="newEditor({ webName: '新建编辑' })"
                circle
            ></el-button>
        </el-row>
        <el-row class="table">
            <el-table
                v-loading="loading"
                :data="webList"
                :default-sort="{prop: 'date', order: 'descending'}"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="页面id">
                    <template slot-scope="{row}">
                        <span style="user-select: text;">{{ row._id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" prop="date" sortable></el-table-column>
                <el-table-column label="网页名称" sortable>
                    <template slot-scope="scope">
                        <label
                            :contenteditable="uName"
                            @dblclick="() => {uName = true}"
                            @blur="updateName($event, scope.row)"
                        >{{scope.row.webName }}</label>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            circle
                            type="primary"
                            icon="el-icon-edit"
                            @click="newEditor(scope.row)"
                        ></el-button>
                        <el-button
                            circle
                            type="danger"
                            icon="el-icon-delete"
                            @click="deletePage(scope.row._id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import { post } from '@/js/ajax';
import { timeParser } from '@/js/util';
import { sendError, sendSuccess } from '@/js/msgBox';

export default {
    data() {
        return {
            webList: [],
            uName: false,
            loading: false,
        };
    },
    beforeMount() {
        this.getPageList();
    },
    methods: {
        async getPageList() {
            this.loading = true;
            try {
                const res = await post({
                    url: '/getPageList',
                });
                res.data.forEach((elem) => {
                    this.webList.push({
                        ...elem,
                        date: timeParser(elem.mTime),
                    });
                });
                this.loading = false;
            } catch (err) {
                sendError('网络出错');
                this.loading = false;
            }
        },
        async newEditor(webInfo) {
            const { _id, webName } = webInfo;
            let webJson = {};
            if (_id) {
                const res = await post({
                    url: '/getPageData',
                    data: {
                        _id,
                    },
                });
                webJson = res.data;
            }
            this.loading = true;
            this.$router.push({
                name: 'webEditor',
                params: {
                    _id,
                    webName,
                    webJson,
                },
            });
        },
        async updateName(e, webInfo) {
            this.uName = false;
            try {
                const after = e.target.innerText;
                const before = webInfo.webName;
                if (!/\S/.test(after)) {
                    sendError('必须输入字符');
                    e.target.innerText = before;
                    return;
                }
                if (after === before) return;
                webInfo.webName = after;
                const res = await post({
                    url: '/updateName',
                    data: {
                        // eslint-disable-next-line no-underscore-dangle
                        webId: webInfo._id,
                        webName: webInfo.webName,
                    },
                });
                sendSuccess(res.data);
            } catch (err) {
                sendError(err);
            }
        },
        async deletePage(webId) {
            const res = await post({
                url: '/removeWeb',
                data: {
                    webId,
                },
            });
            const index = this.webList.indexOf(
                // eslint-disable-next-line no-underscore-dangle
                this.webList.find(item => item._id === webId),
            );
            this.webList.splice(index, 1);
            sendSuccess(res.data);
        },
    },
};
</script>

<style scoped>
#webTable {
    display: flex;
    flex-direction: column;
}
.buttonList .el-button {
    margin: 10px 0px 10px 15px;
}
.el-table {
    font-family: Arial, Helvetica, sans-serif;
    color: #909399;
    font-size: 13px;
}
</style>
