<template>
	<view v-if="loaded" class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">{{ detailInfo.row.title }}</view>
			</view>
			<view slot="right" class="navbar-right detail-navbar-right" :style="{ 'width': capsule ? capsule.width + 20 + 'px' : '110px' }"></view>
		</zx-navbar>
		<view class="page-box detail-root" :style="pageBoxStyle">
			<view class="title">{{ detailInfo.row.title }}</view>
			<view class="desc">{{ detailInfo.row.desc }}</view>
			<view class="announce-footer">
				<view>{{ detailInfo.row.author }}<text class="s-time">{{ detailInfo.row.s_time}}</text></view>
				<view>阅读 {{ detailInfo.row.hits }}</view>
			</view>
			<view class="announce-content">
				<u-parse :html="detailInfo.row.content"></u-parse>
			</view>
			<view class="rel-root">
				<view v-if="detailInfo.rel_list.length > 0" class="rel-box">
					<view class="rel-title">相关阅读</view>
					<block v-for="(item, index) in detailInfo.rel_list" :key="item.id">
						<announce :announce="item" :navigateTo="false"></announce>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import announce from '@/core/components/article/index.vue'
	export default {
		components: {
			announce
		},

		data() {
			return {
				loaded: false,
				id: '', //公告id
				detailInfo: '', //公告详情
			}
		},

		onLoad(options) {
			this.id = options.id ? options.id : ''
			this.fetchAnnounceItem()
		},
		
		computed: {
			pageBoxStyle() {
				let boxStyle = {}
				if (this.androidUpdate) {
					boxStyle = {
						paddingTop: (this.statusH + 49) + 'px'
					}
				} else {
					boxStyle = {
						paddingTop: 'calc(49px + constant(safe-area-inset-top))',
						paddingTop: 'calc(49px + env(safe-area-inset-top))'
					}
				}
				return boxStyle
			}
		},

		methods: {
			/**
			 * 获取公告详情
			 */
			fetchAnnounceItem() {
				this.$util.postRequest(this.$api.cms.item, {
						id: this.id
					}, true,
					res => {
						this.detailInfo = res.data
						uni.setNavigationBarTitle({
							title: res.data.row.title
						})
						this.loaded = true
					},
					err => {
						this.$util.showNoIconToast(err.info)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					})
			}
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}

	.detail-root {
		.pbsafe();
		
		.title {
			color: @text-primary-color;
			background-color: #FFFFFF;
			.wper-100();
			font-size: @font-size-xxxl;
			padding: @padding-xs;
			box-sizing: border-box;
			font-weight: 500;
		}
		
		.desc {
			color: @text-secondary-color;
			background-color: #FFFFFF;
			.wper-100();
			font-size: @font-size-sm;
			padding: 0 @padding-xs;
			box-sizing: border-box;
		}
		
		.announce-footer {
			.flex-c-aic-jcb();
			background-color: #FFFFFF;
			padding: 0 @padding-xs;
			.wper-100();
			box-sizing: border-box;
			color: @text-secondary-color;
			font-size: @font-size-xxs;
			align-self: flex-start;
			
			.s-time {
				padding-left: @padding-xs;
			}
		}
		
		.announce-content {
			.wper-100();
			background-color: #FFFFFF;
			padding: @padding-xs;
			box-sizing: border-box;
		}
		
		.rel-root {
			.pbsafe();
		}
		
		.rel-box {
			.wper-100();
			padding: @padding-xs * 2 0 @padding-xs;
			
			.rel-title {
				.wper-100();
				text-align: center;
				color: @text-primary-color;
				font-weight: 500;
				font-size: @font-size-lg;
				padding-bottom: @padding-xs;
			}
		}
	}
</style>
