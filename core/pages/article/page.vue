<template>
	<view v-if="loaded" class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">{{ exampleInfo.title }}</view>
			</view>
			<view slot="right" class="navbar-right detail-navbar-right" :style="{ 'width': capsule ? capsule.width + 20 + 'px' : '110px' }"></view>
		</zx-navbar>
		<view class="page-box" :style="pageBoxStyle">
			<view class="example-root">
				<view class="example-box">
					<u-parse :html="exampleInfo.content"></u-parse>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: true,
				id: '',
				iden: '',
				exampleInfo: {}, //页面信息
			}
		},
		
		onLoad(options) {
			this.id = options.id ? options.id: ''
			this.iden = options.iden ? options.iden : ''
			this.fetchExampleInfo()
		},
		
		methods: {
			/**
			 * 请求关于我们
			 */
			fetchExampleInfo() {
				this.$util.postRequest(this.$api.cms.page, this.fetchParameters(), true,
					res => {
						this.exampleInfo = res.data.row
						let that = this
						uni.setNavigationBarTitle({
							title: that.exampleInfo.title
						})
						this.loaded = true
					},
					err => {
						this.$util.showNoIconToast(err.info)
						setTimeout(() => {
							this.$util.navigateBack()
						}, 1500)
					})
			},
			
			/**
			 * 参数
			 */
			fetchParameters() {
				let params = {
					id: this.id,
					iden: this.iden
				}
				return params
			}
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}
	
	.example-root {
		.hper-100();
		.pbsafe();
		
		.example-box {
			padding: @padding-xs;
			box-sizing: border-box;
		}
	}
</style>
