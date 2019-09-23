<template>
    <div id="menuBar">
        <el-menu
            :router="true"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            @select="toggle"
        >
            <el-menu-item v-for="menu in menuList" :key="menu.index" :index="menu.index">
                <i :class="menu.class"></i>
                <span slot="title">{{menu.label}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
            menuList: [
                { index: '', label: 'JWeb', class: 'el-icon-menu' },
                {
                    index: '/webTable',
                    label: '查看网页',
                    class: 'el-icon-search',
                },
                {
                    index: '/createWeb',
                    label: '生成网页',
                    class: 'el-icon-refresh',
                },
            ],
        };
    },
    methods: {
        toggle(index) {
            if (index === '') {
                this.isCollapse = !this.isCollapse;
            }
        },
    },
};
</script>

<style scoped>
#menuBar,
.el-menu {
    height: 100%;
}
.el-menu:not(.el-menu--collapse) {
    min-width: 170px;
}
</style>
