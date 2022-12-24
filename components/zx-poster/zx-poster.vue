<template>
	<view class="zx-poster-root">
		<view class="poster-img-box" style="height: calc(100% - 214rpx);">
			<scroll-view :scroll-y="true" class="poster-scroll-view">
				<image webp="true" :show-menu-by-longpress="true" @error="onPosterError" @load="onPosterSuccess" lazy-load="true" mode="" class="poster-img" mode="widthFix" :src="poster"></image>
			</scroll-view>
		</view>
		<view class="btn-box">
			<view class="btn-item-box">
				<button id="zx-poster-btn" open-type="share" class="poster-btn">
					<u-icon name="weixin-fill" size="50" color="#ffffff"></u-icon>
				</button>
				<view class="item-txt">分享好友</view>
			</view>
			<view class="btn-item-box">
				<button @click="onClickSaveBtn" class="save-btn">
					<u-icon name="photo" size="50" color="#ffffff"></u-icon>
				</button>
				<view @click="onClickSaveBtn" class="item-txt">保存图片</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-poster",
		
		props: {
			poster: {
				type: String,
				default: ''
			}
		},
		
		data() {
			return {
				
			}
		},

		watch: {
			poster: {
				handler(val) {
					uni.showLoading({
						title: '加载中...',
						mask: true
					})
				},
				deep: true,
			}
		},
		
		methods: {
			/**
			 * 图片加载失败
			 */
			onPosterError() {
				this.$util.showNoIconToast('海报加载失败')
			},
			
			/**
			 * 图片加载成功
			 */
			onPosterSuccess() {
				uni.hideLoading()
			},
			
			/**
			 * 发送给朋友
			 */
			onClickFriendBtn() {
				
			},
			
			/**
			 * 保存海报
			 */
			onClickSaveBtn() {
				let that = this
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum'] || res.authSetting['scope.writePhotosAlbum'] == undefined) {
							that.savePoster()
						} else if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.openSetting({
								success: res => {
									
								},
								fail: err => {
									that.$util.showNoIconToast('您暂未授权，无法保存图片')
								}
							})
						} else {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success: res => {
									that.savePoster()
								},
								fail: err => {
									that.$util.showNoIconToast('您暂未授权，无法保存图片')
								}
							})
						}
					}
				})
			},
			
			/**
			 * 保存图片
			 */
			savePoster() {
				uni.showLoading({
					title: '保存中...',
					mask: true
				})
				let that = this
				uni.downloadFile({
					url: that.poster,
					success: res => {
						if (res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: res => {
									that.$util.showNoIconToast('保存成功')
								},
								fail: err => {
									if (err.errMsg != 'saveImageToPhotosAlbum:fail cancel') {
										that.$util.showNoIconToast('保存失败')
									}
								}
							})
						}
					},
					fail: err => {
						that.$util.showNoIconToast('保存失败')
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.zx-poster-root {
		width: 65vw;
		height: 90vh;
		.pbsafe();
		
		.poster-img-box {
			.flex-col-jcc();
			
			.poster-scroll-view {
				max-height: 100%;
				
				.poster-img {
					.wper-100();
					vertical-align: middle;
					border-radius: @border-radius-base;
					overflow: hidden;
				}
				
				::-webkit-scrollbar {
					display: none;
					width: 0 !important;
				}
			}
		}
		
		.btn-box {
			margin: @common-blank * 4 0;
			.flex-c-aic-jcb();
			
			.btn-item-box {
				width: 45%;
				.flex-col-aic-jcs();
				
				.poster-btn {
					width: auto!important;
					background-color: #60AF48;
					font-size: @font-size-base;
					color: #FFFFFF;
					padding: @padding-xs;
					margin: 0;
					border-radius: 100rpx;
					.flex-col-aic-jcc();
					
					&::after {
						border: none;
					}
				}
				
				.save-btn {
					width: auto!important;
					background-color: #027aff;
					font-size: @font-size-base;
					color: #FFFFFF;
					padding: @padding-xs;
					margin: 0;
					border-radius: 100rpx;
					.flex-col-aic-jcc();
					
					&::after {
						border: none;
					}
				}
				
				.item-txt {
					padding-top: @padding-xs / 2;
					font-size: @font-size-sm;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
