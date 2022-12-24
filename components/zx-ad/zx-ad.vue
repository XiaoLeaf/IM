<template>
	<view class="root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="inner-view" :style="{ height : (info.inner.height ? info.inner.height * 2 : 300) + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<view class="swiper-container" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx'}">
				<swiper easing-function="linear" class="swiper-view" previous-margin="200rpx" next-margin="200rpx" circular=true  :indicator-dots="info.options.dots" indicator-color="rgba(255, 255, 255 .5)" :indicator-active-color="info.options.color">
					<swiper-item v-for="(item, index) in info.list" :key="index">
						<image @click="onClickZxAdBanner(item)" :style="{'border-radius' : info.options.radius * 2 + 'rpx'}" webp=true lazyLoad=true mode="widthFix" class="swiper-img":src="item.image"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-ad",
		props: {
			info: {
				type: Object,
				default () {
					return {
						
					}
				}
			}
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			/**
			 * 点击图片
			 */
			onClickZxAdBanner(ad) {
				if (ad.url) {
					this.$util.miniAppRoute(ad.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.root {
		box-sizing: border-box;
		
		.inner-view {
			box-sizing: border-box;
			
			.swiper-container {
				height: 100%;
				overflow: hidden;
				transform: translateY(0);
				
				.swiper-view {
					height: 100%;
					
					.swiper-img {
						overflow: hidden;
						height: 100%;
						width: 100%;
					}
				}
			}
		}
	}
</style>
