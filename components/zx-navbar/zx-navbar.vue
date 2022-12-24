<template>
	<view class="navbar-root" :style="rootStyle">
		<view :style="{'max-width': capsule ? (capsule.width + 20) + 'px' : '110px'}" class="left-box">
			<view class="left-content">
				<view class="left-img-box" :style="{ 'width': '110px' }">
					<image v-if="back" @click="onClickBack" webp="true" lazy-load="true" mode="aspectFit" class="back-icon" :src="backColor == 'white' ? '/static/images/back.png' : '/static/images/back-black.png'"></image>
				</view>
				<slot name="left"></slot>
			</view>
		</view>
		<view class="title-box">
			<view class="title-content">
				<slot name="title"></slot>
			</view>
		</view>
		<view :style="{'max-width': '110px'}" class="right-box">
			<view class="right-content">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		name:"zx-navbar",
		
		props: {
			background: {
				type: String,
				default: ''
			},
			
			back: {
				type: Boolean,
				default: true
			},
			
			opacity: {
				type: [Number, String],
				default: 1
			},
			
			backColor: {
				type: String,
				default: 'white'
			}
		},
		
		data() {
			return {
				
			}
		},
		
		computed: {
			rootStyle() {
				let rootStyle = {}
				if (this.androidUpdate) {
					rootStyle = {
						height: (this.statusH + 44) + 'px',
						paddingTop: (this.statusH + 7) + 'px'
					}
				} else {
					rootStyle = {
						height: 'calc(44px + constant(safe-area-inset-top))',
						height: 'calc(44px + env(safe-area-inset-top))',
						paddingTop: 'calc(7px + constant(safe-area-inset-top))',
						paddingTop: 'calc(7px + env(safe-area-inset-top))'
					}
				}
				rootStyle.opacity = this.opacity
				rootStyle.backgroundColor = this.background ? this.background : '#fff'
				// rootStyle.paddingRight = '20px'
				return rootStyle
			}
		},
		
		mounted() {
			
		},
		
		created() {
		
		},
		
		methods: {
			/**
			 * 返回
			 */
			onClickBack() {
				this.$util.navigateBack()
			},
		}
	}
</script>

<style lang="less">
	.navbar-root {
		position:fixed;
		top: 0;
		left: 50%;
		box-sizing: border-box;
		z-index: 999;
		.flex-c-aic();
		width: 100%;
		max-width: 640px;
		transform: translateX(-50%);
		padding: 7px 0;
		
		.left-box {
			height: 100%;
			line-height: 30px;
			/* #ifndef MP-WEIXIN */
			.flex-c-aic();
			/* #endif */
			
			.left-content {
				width: 100%;
				height: 30px;
				.flex-c-aic();
				.line-1();
				// overflow: hidden;
				
				.left-img-box {
					.flex-c-aic();
				}
				
				.back-icon {
					width: 30px;
					height: 30px;
					vertical-align: middle;
					margin-left: @common-blank * 2;
				}
			}
		}
		
		.title-box {
			flex: 1;
			height: 100%;
			line-height: 30px;
			/* #ifndef MP-WEIXIN */
			.flex-c-aic();
			/* #endif */
			
			.title-content {
				width: 100%;
				height: 30px;
				.flex-c-aic();
			}
		}
		
		.right-box {
			.hper-100();
			/* #ifdef MP-WEIXIN */
			line-height: 30px;
			/* #endif */
			/* #ifndef MP-WEIXIN */
			.flex-c-aic();
			/* #endif */
			
			.right-content {
				.wper-100();
				/* #ifdef MP-WEIXIN */
				height: 30px;
				/* #endif */
				.flex-c-aic();
				.line-1();
			}
		}
	}
</style>
