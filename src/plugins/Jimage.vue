<template>
    <Jdiv :id="id" class="j-image" :class="{'is-focus':isFocus}">
        <template slot="input">
            <el-image :src="coverUrl" :preview-src-list="imageUrlList"></el-image>
            <el-dialog :title="`设置图片`" :visible.sync="configVisible">
                <el-form v-model="form">
                    <el-form-item label="添加图片">
                        <el-upload action="no" :data="uploadFile" :before-upload="beforeUpload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="configVisible=false">取消</el-button>
                    <el-button type="primary">保存</el-button>
                </div>
            </el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import draggable from 'vuedraggable';

export default {
    name: 'Jimage',
    mixins: [FormatMixin],
    components: { draggable },
    data() {
        return {
            name: 'Jimage',
            coverUrl: '',
            uploadFile: null,
            imageUrlList: [],
            form: {},
        };
    },
    methods: {
        beforeUpload(file) {},
    },
};
</script>

<style scoped>
.el-image {
    width: 100%;
    height: 100%;
}
</style>
