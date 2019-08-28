<template>
    <div class="j-container">
        123
        <AnyType v-for="node in childNodes" :key="node.id" :nodeProps="node" :plugins="plugins"></AnyType>
    </div>
</template>

<script>
import FormatMixin from '@/mixins/format';
import AnyType from '@/components/anyType';
import test from '../js/test/cConfig';

export default {
    name: 'Jcontainer',
    mixin: [FormatMixin],
    props: ['plugins'],
    components: { AnyType },
    data() {
        return {
            childNodes: test,
        };
    },
    beforeMount() {},
};
</script>

<style scoped>
</style>
