<template>
    <div class="j-container" @click="focus">
        <template slot="input">
            <AnyType v-for="node in childNodes" :key="node.id" :nodeProps="node" :plugins="plugins"></AnyType>
        </template>
    </div>
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
            childNodes: [
                {
                    name: 'Jimage',
                },
                {
                    name: 'Jimage',
                },
                {
                    name: 'Jimage',
                },
            ],
        };
    },
    methods: {
        focus(e) {
            console.log(e);
        },
    },
};
</script>

<style scoped>
</style>
