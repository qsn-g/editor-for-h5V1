<template>
    <component :is="type"></component>
</template>

<script>
export default {
    props: ['nodeProps', 'plugins'],
    data() {
        return {
            type: '',
        };
    },
    beforeMount() {
        this.type = this.nodeProps.name;
    },
};
</script>

<style scoped>
</style>
