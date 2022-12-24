<template>
	<view class="root" :style="{ 'background-color': info.outer.bgColor, 'padding': info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view @click="onClickRichText" class="richtext-box" :style="{'background-color': info.inner.bgColor, 'padding': info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius': info.inner.radius * 2 + 'rpx' }">
			<!-- <rich-text :style="{ 'font-size': info.font.size * 2 + 'rpx', 'color': info.font.color, 'line-height': info.font.lineHeight * 2 + 'rpx' }" :nodes="info.content"></rich-text> -->
			<u-parse :style="{ 'font-size': info.font.size * 2 + 'rpx', 'color': info.font.color, 'line-height': info.font.lineHeight * 2 + 'rpx' }" :html="info.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-richtext",
		
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
			onClickRichText() {
				if (this.info.url) {
					this.$util.miniAppRoute(this.info.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.root {
		box-sizing: border-box;
		
		.richtext-box {
			box-sizing: border-box;
			overflow: hidden;
		}
	}
</style>
