<template>
    <component class="test" :is="selectType">
        <component v-for="item in componentItem" :key="item.key" :is="item.component"></component>
    </component>
</template>

<script>
const anType = {
    props: {
        selectType: {
            type: String,
            default: 'div',
        },
    },
    data() {
        return {
            componentItem: [],
        };
    },
    methods: {
        add(e) {
            e.stopPropagation()
            this.componentItem.push({
                component: anType
            })
        }
    },
}
export default anType
</script>

<style scoped>

</style>