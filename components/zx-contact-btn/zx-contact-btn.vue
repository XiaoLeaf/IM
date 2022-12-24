<template>
	<view class="contact-btn-root">
		<block v-if="indexConfig.global.contact.type">
			<view @click="onClickContactBtn">
				<slot></slot>
			</view>
		</block>
		<block v-else>
			<slot></slot>
		</block>
	</view>
</template>

<script>
	export default {
		name:"zx-contact-btn",
		
		props: {
			btnClass: {
				type: String,
				default: ''
			}
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			/**
			 * 点击客服按钮
			 */
			onClickContactBtn() {
				if (this.indexConfig.global.contact.url) {
					this.$util.miniAppRoute(this.indexConfig.global.contact.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.contact-btn-root {
		
	}
</style>
