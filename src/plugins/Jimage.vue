<template>
    <Jdiv :id="id" class="j-image" :class="{'is-focus':isFocus && isEditor}">
        <template slot="input">
            <el-image
                :src="struct.options.imgList[0] || ''"
                :preview-src-list="struct.options.imgList"
            ></el-image>
            <el-dialog :title="`设置图片`" :visible.sync="configVisible">
                <div class="preview-area">
                    <i class="el-icon-plus">添加图片 (第一张图将作为封面,可通过拖拽进行调整)</i>
                    <vd :options="{group: 'pir'}" v-model="imageUrlList">
                        <el-image
                            class="preview-img"
                            v-for="img in imageUrlList"
                            :key="img.id"
                            :src="img"
                        ></el-image>
                    </vd>
                </div>
                <div class="button-area">
                    <el-upload
                        action
                        :show-file-list="false"
                        :http-request="uploadPir"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                    >
                        <el-button size="small" type="primary">点击上传图片</el-button>
                    </el-upload>
                </div>
                <div class="preview-area">
                    <i class="el-icon-delete">拖拽至此删除图片</i>
                    <vd :options="{group: 'pir'}" v-model="deleteList">
                        <el-image
                            class="preview-img"
                            v-for="img in deleteList"
                            :key="img.id"
                            :src="img"
                        ></el-image>
                    </vd>
                </div>
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
import { JuploadImg } from 'sdk-for-jzx/uploadImg';
import vd from 'vuedraggable';

export default {
    name: 'Jimage',
    mixins: [FormatMixin],
    components: {
        vd,
    },
    data() {
        return {
            name: 'Jimage',
            coverUrl: '',
            imageUrlList: [],
            deleteList: [],
            oldDeleteList: [],
            oldImageUrlList: [],
        };
    },
    watch: {
        configVisible(newValue) {
            if (newValue) {
                this.oldDeleteList = [...this.deleteList];
                this.oldImageUrlList = [...this.imageUrlList];
            }
        },
    },
    beforeMount() {
        if (!Array.isArray(this.struct.options.imgList)) {
            this.struct.options.imgList = [];
        }
        this.imageUrlList = [...this.struct.options.imgList];
    },
    methods: {
        async uploadPir(data) {
            const { file } = data;
            const res = await JuploadImg(file).ali();
            return res;
        },
        handleSuccess(res, file, fileList) {
            try {
                this.imageUrlList.push(res.data.imgurl);
            } catch (e) {
                this.$message.error('请重试');
                const index = fileList.indexOf(file);
                fileList.splice(index, 1);
            }
        },
        handleError(res) {
            this.$message.error(`${res}`);
        },
        onSave() {
            this.struct.options.imgList = [...this.imageUrlList];
            this.configVisible = false;
        },
        onCancel() {
            this.configVisible = false;
            this.deleteList = [...this.oldDeleteList];
            this.imageUrlList = [...this.oldImageUrlList];
            this.oldDeleteList = [];
            this.oldImageUrlList = [];
        },
    },
};
</script>

<style scoped>
.el-image {
    width: 100%;
    height: 100%;
}

.preview-area {
    overflow: scroll;
    white-space: nowrap;
    outline: none;
}
.preview-area i {
    display: block;
    margin-bottom: 10px;
}
.preview-img {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 3px;
    margin-right: 10px;
}
.button-area {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
