import { mapActions } from 'vuex';
import { randomId, drawWeb, initWeb, cbToWJ } from '../js/util';

export default {
    props: ['cJson'],
    data() {
        return {
            id: '',
            struct: {
                name: '',
                id: '',
                options: {},
                childNodes: [],
            },
        };
    },
    beforeMount() {
        this.insertComponent(this);
        if (this.cJson && this.cJson.id) {
            drawWeb(this.cJson);
        } else {
            this.id = randomId(this.$store.state.allWebJson);
            this.struct = initWeb(this);
            cbToWJ(this.struct);
        }
    },
    methods: {
        ...mapActions(['insertComponent', 'funToWJ']),
    },
};
