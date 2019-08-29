<template>
    <div tabindex="-1" class="Jdiv" @focus="focus">
        <slot name="input"></slot>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Jdiv',
    methods: {
        ...mapActions(['setFocus']),
        focus(e) {
            const id = e.target.id;
            const component = this.$store.state.componentList.find(
                item => item.id === id,
            );
            this.setFocus(component);
            e.stopPropagation();
        },
    },
};
</script>

<style scoped>
.Jdiv {
    display: flex;
    flex: 1;
}
</style>
