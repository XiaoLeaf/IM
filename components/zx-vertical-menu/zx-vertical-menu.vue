<template>
	<view class="zx-vertical-menu-root">
		<view class="zx-vertical-menu-box">
			<view v-for="(root, rootindex) in 7" :key="rootindex" class="menu-section">
				<view v-for="(item, index) in 2" :key="index" class="menu-item">
					<view class="item-left">
						<image webp="true" lazy-load="true" class="line-icon" mode="aspectFill" src=""></image>
						<view class="line-title">我的菜单</view>
					</view>
					<view class="item-right">
						<view class="right-box">
							
						</view>
						<u-icon name="arrow-right" size="24" color="#999"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-vertical-menu",
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less">
	.zx-vertical-menu-root {
		box-sizing: border-box;
		
		.zx-vertical-menu-box {
			box-sizing: border-box;
		}
		
		.menu-section {
			background-color: #fff;
			margin-bottom: @common-blank;
			
			&:first-child {
				margin-top: @common-blank;
			}
			
			.menu-item {
				padding: @padding-xs + 10rpx;
				box-sizing: border-box;
				line-height: 40rpx;
				.flex-c-aic-jcb();
				position: relative;
				
				&:not(:last-child)::after {
					position: absolute;
					bottom: 0;
					left: 100rpx;
					content: '';
					width: calc(100% - 100rpx);
					height: 1px;
					background-color: @border-color;
				}
				
				.item-left {
					.flex-c-aic();
					
					.line-icon {
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						background-color: @primary-color;
						border-radius: 50rpx;
						overflow: hidden;
					}
					
					.line-title {
						color: @text-primary-color;
						font-size: @font-size-lg;
						font-weight: 700;
						padding-left: @padding-xs;
					}
				}
				
				.item-right {
					flex: 1;
					overflow: hidden;
					padding-left: @padding-xs;
					box-sizing: border-box;
					.flex-c-aic-jce();
				}
				
				.right-box {
					.flex-c-aic();
					flex: 1;
					padding-right: @padding-xs;
					box-sizing: border-box;
					overflow: hidden;
					color: @text-primary-color;
					font-size: @font-size-base;
					
					.right-avatar {
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						background-color: @primary-color;
						border-radius: 50rpx;
						overflow: hidden;
					}
					
					.right-title {
						padding-right: @padding-xs / 2;
					}
				}
			}
		}
	}
</style>