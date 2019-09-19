<template>
    <div id="app">
        <menuBar v-if="isPreview" />
        <router-view class="rightBar"></router-view>
    </div>
</template>

<script>
import menuBar from '@/components/menuBar';

export default {
    name: 'App',
    components: {
        menuBar,
    },
    computed: {
        isPreview() {
            return this.$route.name !== 'getWebUI';
        },
    },
};
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: row;
}
.rightBar {
    flex: 1;
}
</style>
