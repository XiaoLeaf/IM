<template>
	<view class="menu-root" :style="info.outer.style">
		<view class="menu-box">
			<view v-if="info.title.text || info.title.right.text" class="item-header" :style="info.title.style">
				<view v-if="info.title.text" class="header-title" :style="info.title.titleStyle">{{ info.title.text }}</view>
				<view v-if="info.title.right.text" @click="onClickRightTitle" class="header-right" :style="info.title.right.style">
					<text>{{ info.title.right.text }}</text>
					<u-icon name="arrow-right" :color="info.title.right.color" :size="info.title.right.size * 2"></u-icon>
				</view>
			</view>
			<block v-if="info.inner.display == 1">
				<view class="menu-content" :style="info.inner.style">
					<block v-for="(item, index) in info.list" :key="index">
						<view @click="onClickZxMenu(item)" class="menu-item" :style="{ 'width': (100 / info.inner.cols) + '%'}">
							<view class="item-img-box">
								<image webp="true" lazy-load="true" class="menu-img" :src="item.image" :style="info.inner.imageStyle + item.imageStyle"></image>
								<u-badge v-if="item.badge.text" :is-center="true" :style="item.badge.style" :count="item.badge.text"></u-badge>
							</view>
							<view class="menu-name" :style="info.inner.fontStyle + item.fontStyle">{{ item.text }}</view>
						</view>
					</block>
				</view>
			</block>
			<view v-else-if="info.inner.display == 2" :style="info.inner.style">
				<block v-for="(item, index) in info.list" :key="index">
					<view @click="onClickZxMenu(item)" class="vertical-menu-item">
						<view class="vertical-item-left">
							<image webp="true" lazy-load="true" class="vertical-line-icon" mode="aspectFill" :style="info.inner.imageStyle + item.imageStyle" :src="item.image"></image>
							<view class="vertical-line-title" :style="info.inner.fontStyle + item.fontStyle">{{ item.text }}</view>
						</view>
						<view class="vertical-item-right">
							<view v-if="item.badge.text" @click.stop="onClickRightBadge(item.badge)" class="vertical-right-box" :style="item.badge.style">
								<view class="vertical-right-title">{{ item.badge.text }}</view>
								<image v-if="item.badge.icon" webp="true" lazy-load="true" class="vertical-right-avatar" mode="aspectFill" :src="item.badge.icon"></image>
							</view>
							<u-icon name="arrow-right" size="24" color="#999"></u-icon>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-menu",
		
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
		},
		
		methods: {
			/**
			 * 点击右侧标题
			 */
			onClickRightTitle() {
				if (this.info.title.right.url) {
					this.$util.miniAppRoute(this.info.title.right.url)
				}
			},
			
			/**
			 * 点击菜单
			 */
			onClickZxMenu(menu) {
				if (menu.url) {
					this.$util.miniAppRoute(menu.url)
				}
			},
			
			/**
			 * 右侧badge
			 */
			onClickRightBadge(badge) {
				if (badge.url) {
					this.$util.miniAppRoute(badge.url)
				}
			}
		}
	}
</script>

<style lang="less">
	.menu-root {
		box-sizing: border-box;
		
		.menu-box {
			box-sizing: border-box;
			
			.item-header {
				.flex-c-aic-jcb();
				padding: 0 20px;
				box-sizing: border-box;
				
				.header-title {
					color: @text-primary-color;
					font-size: 14px;
				}
				
				.header-right {
					line-height: 20px;
					.flex-c-aic();
					color: @text-secondary-color;
					font-size: 12px;
				}
				
				.header-right-btn {
					line-height: normal;
					margin: 0;
					padding: 0;
					background-color: transparent;
					.flex-c-aic();
					
					&::after {
						border: none;
					}
				}
			}
			
			.menu-content {
				.flex-c();
				flex-wrap: wrap;
				color: @text-secondary-color;
				font-size: 12px;
				.wper-100();
				// padding: @padding-xs * 2 0;
					
				.menu-badge {
					position: absolute;
					top: -1.0em;
					right: .3em;
					width: -webkit-fill-available;
					font-size: @font-size-xxs!important;
				}
				
				.menu-item {
					position: relative;
					.flex-col-aic();
				}
				
				.item-img-box {
					position: relative;
				}
				
				.menu-img {
					width: 25px;
					height: 25px;
					vertical-align: middle;
				}
				
				.menu-name {
					line-height: normal;
				}
				
				.menu-btn {
					overflow: unset!important;
					margin: 0!important;
					padding: 0!important;
					.flex-col-aic-jcc();
					background-color: transparent;
					
					&::after {
						border: none;
					}
				}
			}
			
			.vertical-menu-item {
				padding: @padding-xs + 10rpx 0;
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
				
				.vertical-item-left {
					.flex-c-aic();
					
					.vertical-line-icon {
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						border-radius: 50rpx;
						overflow: hidden;
					}
					
					.vertical-line-title {
						color: @text-primary-color;
						font-size: @font-size-lg;
						font-weight: 700;
						padding-left: @padding-xs;
					}
				}
				
				.vertical-item-right {
					flex: 1;
					overflow: hidden;
					padding-left: @padding-xs;
					box-sizing: border-box;
					.flex-c-aic-jce();
				}
				
				.vertical-right-box {
					.flex-c-aic-jce();
					flex: 1;
					padding-right: @padding-xs;
					box-sizing: border-box;
					overflow: hidden;
					color: @text-secondary-color;
					font-size: @font-size-sm;
					
					.vertical-right-avatar {
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
						border-radius: 50rpx;
						overflow: hidden;
						margin-left: @common-blank;
					}
					
					.vertical-right-title {
						
					}
				}
			}
		}
	}
</style>
