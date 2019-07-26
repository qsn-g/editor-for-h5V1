<template>
    <div id="app">
        <menuBar/>
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
    data() {
        return {
        };
    },
    mounted () {
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
