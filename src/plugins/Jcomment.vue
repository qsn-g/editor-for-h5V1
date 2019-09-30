<template>
    <Jdiv
        :id="id"
        class="j-comment"
        :class="{'is-focus':isFocus && isEditor}"
        :style="struct.options.style"
    >
        <template slot="input">
            <div class="topic">
                <h2>{{struct.options.commentValue.title || '这是个测试标题'}}</h2>
                <label>{{'这是个测试的发布内容啊哈哈哈哈哈哈'}}</label>
                <div>
                    <el-button
                        @click="star"
                        :disabled="stared === 'true' ? true : false"
                        type="text"
                    >点赞</el-button>
                    <span>{{struct.options.commentValue.starNum || 0}}</span>
                </div>
            </div>
            <div class="comment" style="flex:1">
                <h2>相关评论</h2>
                <ul>
                    <li v-for="item in struct.options.commentValue.data" :key="item.id">
                        <label>{{item.c}}</label>
                        <span>{{item.city}}</span>
                    </li>
                </ul>
            </div>
            <div class="publish-comment">
                <RichText />
            </div>
        </template>
    </Jdiv>
</template>

<script>
import RichText from '@/components/richText';
import FormatMixin from '@/mixins/format';
import { sendWarm } from '@/js/msgBox';

export default {
    name: 'Jcomment',
    mixins: [FormatMixin],
    components: {
        RichText,
    },
    data() {
        return {
            name: 'Jcomment',
            count: 0,
            stared: localStorage.getItem('starNum'),
            cityInfo: window.returnCitySN,
            inputComment: '',
            setValue: {
                starNum: 100,
                title: '',
                topic: '',
                data: [{ c: '1', city: 'nanj' }, { c: '2', city: 'beij' }],
            },
        };
    },
    beforeMount() {
        if (!this.struct.options.commentValue) {
            this.struct.options.commentValue = {
                title: '',
                topic: '',
                data: [],
                starNum: 0,
            };
        }
    },
    methods: {
        copyStruct() {},
        addComment() {
            if (!/\S/.test(this.inputComment)) {
                sendWarm('请输入有效评论');
                return;
            }
            this.struct.options.commentValue.data.push({
                c: this.inputComment,
                city: this.cityInfo.cname,
            });
        },
        star() {
            localStorage.setItem('starNum', true);
            this.stared = 'true';
            this.struct.options.commentValue.starNum += 1;
        },
    },
};
</script>

<style scoped>
.j-comment {
    flex-direction: column;
}
.j-comment .topic {
    padding: 10px 10px;
    flex-direction: column;
    display: flex;
    border-bottom: 1px solid #ebeef5;
}
.j-comment .topic h2 {
    border-bottom: 1px solid #ebeef5;
    padding: 10px 20px;
    font-weight: 500;
    letter-spacing: 2px;
}
.j-comment .topic label {
    color: #606266;
    padding: 20px;
    display: block;
    font-size: 14px;
}
.j-comment .topic div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.j-comment .topic div span {
    font-size: 14px;
    color: #606266;
    padding: 0px 10px;
}
.j-comment .comment {
    padding: 0px 10px;
}
.j-comment .comment h2 {
    padding: 10px 20px;
    border-bottom: 1px solid #ebeef5;
    font-weight: 400;
}
.j-comment .comment ul {
    overflow: auto;
}
.j-comment .comment li {
    color: #606266;
    font-size: 14px;
    border-bottom: 1px solid #ebeef5;
}
.j-comment .comment li label {
    padding: 10px 30px;
    display: block;
}
.j-comment .comment li span {
    color: #c2c2c5;
    display: block;
    text-align: right;
    font-size: 7px;
    padding: 5px 10px;
}
</style>
