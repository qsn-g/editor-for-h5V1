<template>
    <Jdiv
        :id="id"
        class="j-card"
        :class="{'is-focus':isFocus && isEditor}"
        :style="struct.options.style"
    >
        <template slot="input">
            <el-card>
                <div slot="header">
                    <span>{{ struct.options.cardValue.cardText || '默认卡片' }}</span>
                    <el-button
                        v-if="struct.options.cardValue.btLink"
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="jumpTo(struct.options.cardValue.btLink)"
                    >{{ struct.options.cardValue.btText || '默认按钮' }}</el-button>
                </div>
                <img v-if="struct.options.cardValue.imgUrl" :src="struct.options.cardValue.imgUrl" />
                <label
                    v-if="struct.options.cardValue.textArea"
                    class="card-write"
                >{{ struct.options.cardValue.textArea }}</label>
            </el-card>
            <el-dialog :title="`设置卡片`" v-if="configVisible" :visible.sync="configVisible">
                <div class="header-area">
                    <el-input placeholder="输入卡片名" v-model="setValue.cardText">
                        <span slot="prepend">输入卡片名:</span>
                    </el-input>
                    <el-input placeholder="输入按钮名" v-model="setValue.btText">
                        <span slot="prepend">输入按钮名:</span>
                    </el-input>
                </div>
                <div class="link-area">
                    <el-input placeholder="若按钮链接为空, 按钮不会显示" v-model="setValue.btLink">
                        <span slot="prepend">请输入按钮链接:</span>
                    </el-input>
                </div>
                <div class="img-area">
                    <span>上传图片:</span>
                    <el-upload
                        action
                        :http-request="uploadPir"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        class="el-upload-out"
                        :show-file-list="false"
                    >
                        <img v-if="setValue.imgUrl" :src="setValue.imgUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-button type="text" @click="setValue.imgUrl = ''">清除图片</el-button>
                </div>
                <div class="text-area">
                    <el-input
                        placeholder="请输入文本内容"
                        type="textarea"
                        autosize
                        v-model="setValue.textArea"
                    ></el-input>
                </div>
                <div slot="footer">
                    <el-button size="small" @click="onCancel">取消</el-button>
                    <el-button size="small" @click="onSave" type="primary">保存</el-button>
                </div>
            </el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import { jumpTo } from '@/js/util';
import { JuploadImg } from 'sdk-for-jzx/uploadImg';

export default {
    name: 'Jcard',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jcard',
            jumpTo,
            setValue: {
                imgUrl: '',
                textArea: '',
                btLink: '',
                btText: '',
                cardText: '',
            },
        };
    },
    beforeMount() {
        if (!this.struct.options.cardValue) {
            this.struct.options.cardValue = {
                imgUrl: '',
                textArr: [],
                btLink: '',
                btText: '',
                cardText: '',
            };
        }
        this.setValue = { ...this.struct.options.cardValue };
    },
    methods: {
        async uploadPir(data) {
            const { file } = data;
            const res = await JuploadImg(file).sougou();
            return res;
        },
        handleSuccess(res) {
            try {
                if (!res.data.imgurl) {
                    throw Error('请重试');
                }
                this.setValue.imgUrl = res.data.imgurl;
            } catch (e) {
                this.$message.error(`${e}`);
            }
        },
        handleError(res) {
            this.$message.error(`${res}`);
        },
        onSave() {
            this.configVisible = false;
            this.struct.options.cardValue = { ...this.setValue };
        },
        onCancel() {
            this.configVisible = false;
            this.setValue = { ...this.struct.options.cardValue };
        },
    },
};
</script>

<style>
.el-card {
    width: 100%;
}
.el-card .card-write {
    white-space: pre-wrap;
}
.el-card .el-card__body img {
    margin-bottom: 20px;
    display: block;
    max-width: 100%;
}
.header-area {
    display: flex;
    justify-content: space-around;
}
.header-area .el-input,
.link-area .el-input {
    padding: 0 20px;
}
.header-area .el-input-group__prepend,
.link-area .el-input-group__prepend {
    font-size: 12px;
}
.header-area .el-input__inner,
.link-area .el-input__inner {
    height: 30px;
}
.img-area,
.text-area,
.link-area {
    padding: 20px 0;
    display: flex;
}
.img-area span {
    display: flex;
    align-items: center;
    padding: 20px;
}
.img-area .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    width: 120px;
    height: 120px;
    position: relative;
    overflow: hidden;
}
.img-area .el-upload img {
    width: 120px;
    height: 120px;
}
.img-area .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
</style>
