<template>
  <div class="editor">
    <el-drawer title="工具栏" size="18%" :append-to-body="true" :visible.sync="drawer" direction="rtl">
      <div class="content">
        <h4>当前焦点: {{$store.state.focusElem ? '已聚焦' : '无'}}</h4>
        <el-button @click="test">按钮</el-button>
      </div>
    </el-drawer>
    <el-row id="workSpace" @click="test"></el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WebEditor from '@/js/webEditor';
import Jbutton from '../js/modules/Jbutton';

export default {
    data() {
        return {
            webEditor: null,
            drawer: false,
        };
    },
    beforeMount() {
        const { _id, webName } = this.$route.params;
        if (!_id && !webName) {
            this.$router.push({
                name: 'webTable',
            });
            return;
        }
        this.webEditor = new WebEditor({ webName, webId: _id });
        document.onmousemove = (e) => {
            if (e.clientX + 20 >= window.innerWidth) {
                this.drawer = true;
            }
        };
    },
    beforeDestroy() {
        document.onmousemove = null;
    },
    methods: {
        ...mapActions(['setNextStruct']),
        test() {
            /* eslint-disable no-new */
            new Jbutton(this.webEditor);
        },
        test2() {
            const t = document.getElementById(this.$store.state.focusElem);
            t.setAttribute('style', 'display: flex; flex: 1;');
        },
    },
};
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
}
.content {
  margin: 0 15px 0 15px;
  display: flex;
  flex-direction: column;
}
#workSpace {
  flex: 1;
}
</style>
