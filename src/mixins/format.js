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
    computed: {
        isEditor() {
            return this.$route.name !== 'getWebUI';
        },
    },
    beforeMount() {
        this.insertComponent(this);
        if (this.cJson && this.cJson.id) {
            this.id = this.cJson.id;
            drawWeb(this.cJson, this);
            if (this.cJson.childNodes) {
                this.childNodes = this.cJson.childNodes;
            }
        } else {
            this.id = randomId(this.$store.state.allWebJson);
            this.struct = initWeb(this);
            this.childNodes = this.struct.childNodes;
            cbToWJ(this.struct);
        }
    },
    methods: {
        ...mapActions(['insertComponent', 'funToWJ']),
    },
};
