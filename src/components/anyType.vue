<template>
    <component :is="type" :cJson="cJson"></component>
</template>

<script>
export default {
    props: ['cJson'],
    data() {
        return {
            type: '',
        };
    },
    beforeMount() {
        this.type = this.cJson.name;
    },
};
</script>

<style scoped>
</style>
