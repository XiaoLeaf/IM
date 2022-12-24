<template>
	<view class="root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="inner-view" :style="{ 'background-color' : info.inner.bgColor, height : info.inner.height * 2 + 'rpx', padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<!-- <view class="swiper-box" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx'}">
				<swiper class="zx-swiper" circular="true" :autoplay="true" interval="3000" :indicator-dots="info.options.dots"
				 indicator-color="#ffffff80" :indicator-active-color="info.options.color">
					<swiper-item v-for="(item, index) in info.list" :key="index">
						<image @click="onClickBanner(item)" :style="{'border-radius' : info.options.radius * 2 + 'rpx'}" webp="true" lazy-load="true" mode="aspectFill" class="img" :src="item.image"></image>
					</swiper-item>
				</swiper>
			</view> -->
			<u-swiper @click="onClickBanner" :height="info.inner.height * 2" class="zx-swiper" :list="info.list" interval="3000" :border-radius="info.options.radius * 2"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-slide",
		
		props: {
			info: {
				type: Object,
				default() {
					return {
						
					}
				}
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			onClickBanner(index) {
				let banner = this.info.list[index]
				if (banner.url) {
					this.$util.miniAppRoute(banner.url)
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
			
			.swiper-box {
				height: 100%;
				overflow: hidden;
				
				.zx-swiper {
					height: 100%!important;
					
					.img {
						overflow: hidden;
						vertical-align: middle;
						height: 100%;
						width: 100%;
					}
				}
			}
		}
	}
</style>
