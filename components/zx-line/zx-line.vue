<template>
	<view class="root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view :style="{ width : info.line.width + '%' , 'border-bottom' : info.line.height * 2 + 'rpx ' + info.line.color + ' ' + info.line.style }"></view>
	</view>
</template>

<script>
	export default {
		name:"zx-line",
		
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
	.root {
		box-sizing: border-box;
	}
</style>
