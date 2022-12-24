import { mapGetters } from 'vuex'
import util from '@/utils/util.js'
import api from '@/config/api.js'
export default {
	data() {
		return {

		}
	},

	computed: {
		...mapGetters([
			'loginStatus'
		])
	},

	watch: {
		loginStatus: {
			handler(val) {
				if (val || !val) {
					this.loginUpdate()
				}
			},
			deep: true,
		}
	},

	methos: {
		loginUpdate: function() {

		}
	}
}