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
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <img
                    style="width:100%"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                />

                <div class="card-write"></div>
            </el-card>
            <el-dialog :title="`设置卡片`" v-if="configVisible" :visible.sync="configVisible">
                <div class="img-area">
                    <el-upload action>123</el-upload>
                </div>
                <div class="text-area"></div>
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

export default {
    name: 'Jcard',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jcard',
            setValue: {
                imgUrl: '',
                textArr: [],
                btLink: '',
                btText: '',
                cardText: '',
            },
        };
    },
    methods: {
        onSave() {
            this.configVisible = false;
        },
        onCancel() {
            this.configVisible = false;
        },
    },
};
</script>

<style>
.el-card {
    width: 100%;
}
</style>
