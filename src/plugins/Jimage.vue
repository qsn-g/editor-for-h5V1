<template>
    <Jdiv class="j-image">
        <template slot="input">123</template>
    </Jdiv>
</template>

<script>
import FormatMixin from '@/mixins/format';

export default {
    name: 'Jimage',
    mixins: [FormatMixin],
    data() {
        return {
            name: 'Jimage',
        };
    },
};
</script>

<style scoped>
</style>
