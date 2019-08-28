import { mapActions } from 'vuex';
import { randomId } from '../js/util';

export default {
    data() {
        return {
            id: '',
        };
    },
    beforeMount() {
        this.id = randomId();
        this.insertComponent(this);
        // console.log(this.$store);
    },
    methods: {
        ...mapActions(['insertComponent']),
    },
};
