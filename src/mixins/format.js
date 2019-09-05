import { mapActions } from 'vuex';
import { randomId, drawWeb, initWeb, cbToWJ } from '../js/util';

export default {
    props: ['cJson'],
    data() {
        return {
            configVisible: false,
            isFocus: false,
            id: '',
            struct: {
                name: '',
                id: '',
                options: {},
                childNodes: [],
            },
        };
    },
    watch: {},
    beforeMount() {
        this.insertComponent(this);
        if (this.cJson && this.cJson.id) {
            this.id = this.cJson.id;
            drawWeb(this.cJson, this);
            if (this.cJson.childNodes) {
                this.childNodes = [...this.cJson.childNodes];
            }
        } else {
            this.id = randomId(this.$store.state.allWebJson);
            this.struct = initWeb(this);
            cbToWJ(this.struct);
        }
    },
    mounted() {
        if (this.struct.options.style) {
            const style = this.struct.options.style;
            let styleStr = '';
            Object.keys(style).forEach((key) => {
                styleStr += `${key}: ${style[key]};`;
            });
            this.$el.setAttribute('style', styleStr);
        }
    },
    methods: {
        ...mapActions(['insertComponent', 'funToWJ']),
    },
};
