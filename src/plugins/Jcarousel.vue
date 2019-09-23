<template>
    <Jdiv
        :id="id"
        class="j-carousel"
        :class="{'is-focus':isFocus && isEditor}"
        :style="struct.options.style"
    >
        <template slot="input">
            <el-carousel></el-carousel>
            <el-dialog :title="`设置跑马灯`" v-if="configVisible" :visible.sync="configVisible">
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
    name: 'Jcarousel',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jcarousel',
        };
    },
    methods: {
        onSave() {},
        onCancel() {},
    },
};
</script>

<style scoped>
</style>
