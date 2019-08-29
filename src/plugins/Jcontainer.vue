<template>
    <Jdiv :id="id" class="j-container" :class="{'is-focus': isFocus}">
        <template slot="input">
            <AnyType v-for="node in childNodes" :key="node.id" :nodeProps="node" :plugins="plugins"></AnyType>
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import AnyType from '@/components/anyType';

export default {
    name: 'Jcontainer',
    mixins: [FormatMixin],
    props: ['plugins'],
    components: { AnyType },
    data() {
        return {
            name: 'Jcontainer',
            isFocus: false,
            childNodes: [],
        };
    },
    beforeMount() {
        this.struct.childNodes =
            this.cJson && this.cJson.childNodes ? this.cJson.childNodes : [];
    },
    methods: {},
};
</script>

<style scoped>
.is-focus {
    background: #ecf5ff;
}
</style>
