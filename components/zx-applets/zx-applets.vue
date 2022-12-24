<template>
	<view class="zx-applets-root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="zx-applets-box" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<navigator target="miniProgram" :app-id="info.params.appid" :path="info.params.pages" hover-class="none">
				<image webp="true" lazy-load="true" mode="widthFix" class="zx-applets-img" :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}" :src="info.params.image"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-applets",
		
		props: {
			info: {
				type: Object,
				default() {
					return {
						
					}
				}
			}
		}
		
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less">
	.zx-applets-root {
		box-sizing: border-box;
		
		.zx-applets-box {
			box-sizing: border-box;
			
			.zx-applets-img {
				.wper-100();
				vertical-align: middle;
			}
		}
	}
</style>
