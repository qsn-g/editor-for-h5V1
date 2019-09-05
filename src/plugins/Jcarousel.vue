<template>
    <Jdiv :id="id" class="j-carousel" :class="{'is-focus':isFocus}">
        <template slot="input">
            <el-carousel></el-carousel>
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
};
</script>

<style scoped>
</style>
