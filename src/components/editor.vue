<template>
    <div class="editor">
        <el-row>
            <el-button
                @click="test"
                v-for="elem in componentType"
                :key="elem.e">
                    {{elem}}
                </el-button>
        </el-row>
        <el-row id="workSpace" @click="test">
        </el-row>
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
            webJson: {},
            componentItem: [],
            componentType: ['button', 'upload', 'link'],
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
        this.webEditor = new WebEditor({ webName, webId: _id, components: this.componentItem });
    },
    methods: {
        ...mapActions([
            'setNextStruct',
        ]),
        test() {
            /* eslint-disable no-new */
            new Jbutton();
        },
    },
};
</script>

<style scoped>
.editor {
    display: flex;
    flex-direction: column;
}
#workSpace {
    flex: 1;
}
.el-carousel__item h3 {
color: #475669;
font-size: 14px;
opacity: 0.75;
margin: 0;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
</style>
