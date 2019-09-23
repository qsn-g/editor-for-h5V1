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
                    <span>{{ struct.options.cardValue.cardText }}</span>
                    <el-button
                        v-if="struct.options.cardValue.btLink"
                        style="float: right; padding: 3px 0"
                        type="text"
                        @click="jumpTo(struct.options.cardValue.btLink)"
                    >{{ struct.options.cardValue.btText }}</el-button>
                </div>
                <img
                    style="width:100%"
                    src="https://shadowx.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                />

                <div class="card-write"></div>
            </el-card>
            <el-dialog :title="`设置卡片`" v-if="configVisible" :visible.sync="configVisible">
                <div class="header-area">
                    <el-input placeholder="输入卡片名" v-model="setValue.cardText">
                        <span slot="prepend">输入卡片名:</span>
                    </el-input>
                </div>
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
import { jumpTo } from '@/js/util';

export default {
    name: 'Jcard',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jcard',
            jumpTo,
            setValue: {
                imgUrl: '',
                textArr: [],
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
                btText: '默认按钮',
                cardText: '默认卡片',
            };
        }
        // this.setValue = this.copyStruct();
        console.log(this.setValue);
    },
    methods: {
        copyStruct() {
            const t = this.struct.options.cardValue;
            const o = {
                imgUrl: t.imgUrl,
                textArr: [...t.textArr],
                btLink: t.btLink,
                btText: t.btText,
                cardText: '',
            };
            return o;
        },
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
