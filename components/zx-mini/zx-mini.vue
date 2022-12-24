<template>
	<view class="mini-root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="mini-content" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<navigator target="miniProgram" :app-id="info.params.appid" :path="info.params.pages" hover-class="none">
				<image webp="true" lazy-load="true" mode="widthFix" class="mini-image" :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}" :src="info.params.image"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-mini",
		
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
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.mini-root {
		box-sizing: border-box;
		
		.mini-content {
			box-sizing: border-box;
			
			.mini-image {
				width: 100%;
			}
		}
	}
</style>
