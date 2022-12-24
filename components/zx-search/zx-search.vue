<template>
	<view class="root" :class="{'sticky-tabs': info.outer.fixed}" :style="{padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx', 'background-color': info.outer.bgColor}">
		<navigator url="/goods/pages/search/index" hover-class="none">
			<view class="inner-view" :style="{'background-color': info.inner.bgColor, 'border-radius': info.inner.radius * 2 + 'rpx', 'justify-content': (info.input.textAlign=='center' ? 'center' : info.input.textAlign=='left' ? 'flex-start' : info.input.textAlign=='right' ? 'flex-end' : 'flex-start')}">
				<u-icon name="search" size="32" :color="info.input.color"></u-icon>
				<text class="inner-text" :style="{color: info.input.color, 'font-size': info.input.size * 2 + 'rpx', height: info.input.height * 2 + 'rpx', 'line-height': info.input.height * 2 + 'rpx'}">{{ info.input.text }}</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"zx-search",
		
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
	.sticky-tabs {
		z-index: 990;
		position: sticky;
		top: var(--window-top);
	}
	
	.root {
		box-sizing: border-box;
		
		.inner-view {
			box-sizing: border-box;
			overflow: hidden;
			flex: 1;
			.flex-c-aic();
			padding: 0 20rpx;
			
			.inner-text {
				box-sizing: border-box;
			}
		}
	}
</style>
