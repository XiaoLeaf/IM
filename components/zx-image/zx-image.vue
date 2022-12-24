<template>
	<view class="root"
		:style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="img-box" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<view v-for="(item, index) in info.list" :key="index" @click="onClickZxImage(item)" :style="{'width': info.cols ? 'calc((100% - ' + info.inner.gap * 2 * (info.cols - 1) + 'rpx) / ' + info.cols + ')' : '100%', 'margin-right': info.cols ? index % info.cols == (info.cols - 1) ? '0rpx' : info.inner.gap * 2 + 'rpx' : '0rpx', 'margin-bottom': info.cols ? (index >= info.list.length - info.cols ? '0rpx' : info.inner.gap * 2 + 'rpx') : (index >= info.list.length - 1 ? '0rpx' : info.inner.gap * 2 + 'rpx')}">
				<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="zx-img" :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-image",

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
			onClickZxImage(item) {
				if (item.url) {
					this.$util.miniAppRoute(item.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.root {
		box-sizing: border-box;

		.img-box {
			.flex-c();
			flex-wrap: wrap;
			box-sizing: border-box;
			overflow: hidden;

			.zx-img {
				width: 100%;
				vertical-align: middle;
				overflow: hidden;
			}
		}
	}
</style>
