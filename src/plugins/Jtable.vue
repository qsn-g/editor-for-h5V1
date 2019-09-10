<template>
    <Jdiv :id="id" class="j-table" :class="{'is-focus':isFocus}">
        <template slot="input">
            <el-table></el-table>
            <el-dialog :title="`设置表格`" :visible.sync="configVisible"></el-dialog>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';

export default {
    name: 'Jtable',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jtable',
        };
    },
};
</script>

<style scoped>
</style>
