<template>
    <div>
        <component :is="type"></component>
    </div>
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
        console.log(this.type);
    },
};
</script>

<style scoped>
</style>
