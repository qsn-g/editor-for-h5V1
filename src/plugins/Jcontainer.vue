<template>
    <Jdiv
        :id="id"
        class="j-container"
        :class="{'is-focus':isFocus && isEditor}"
        :style="struct.options.style"
    >
        <template slot="input">
            <!-- <vd v-model="childNodes"> -->
            <AnyType v-for="node in childNodes" :key="node.id" :cJson="node"></AnyType>
            <!-- </vd> -->
        </template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';
import AnyType from '@/components/anyType';
import vd from 'vuedraggable';

export default {
    name: 'Jcontainer',
    mixins: [FormatMixin],
    components: { AnyType, vd },
    data() {
        return {
            name: 'Jcontainer',
            childNodes: [],
        };
    },
    methods: {},
};
</script>

<style scoped>
.j-container {
    overflow: auto;
}
</style>
