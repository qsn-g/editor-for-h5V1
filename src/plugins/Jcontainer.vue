<template>
    <Jdiv :id="id" class="j-container" :class="{'is-focus':isFocus}" :style="struct.options.style">
        <template slot="input">
            <AnyType v-for="node in childNodes" :key="node.id" :cJson="node"></AnyType>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import AnyType from '@/components/anyType';

export default {
    name: 'Jcontainer',
    mixins: [FormatMixin],
    components: { AnyType },
    data() {
        return {
            name: 'Jcontainer',
            childNodes: [],
        };
    },
    beforeMount() {
        if (!Array.isArray(this.struct.childNodes)) this.struct.childNodes = [];
    },
    methods: {},
};
</script>

<style scoped>
.j-container {
    overflow: auto;
}
</style>
