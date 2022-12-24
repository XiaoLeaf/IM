const store = require('@/store')
import util from '@/utils/util.js'
import api from '@/config/api.js'
module.exports = {
	
	data() {
		return {
			times: 0
		}
	},
	
	computed: {
		pageBoxStyle() {
			let boxStyle = {}
			if (this.androidUpdate) {
				boxStyle = {
					paddingTop: (this.statusH + 44) + 'px'
				}
			} else {
				boxStyle = {
					paddingTop: 'calc(44px + constant(safe-area-inset-top))',
					paddingTop: 'calc(44px + env(safe-area-inset-top))'
				}
			}
			return boxStyle
		}
	},
	
	methods: {
		
	}
}