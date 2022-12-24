<template>
	<view class="zx-article-root" :style="{ color: info.font.color , 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="zx-article-box" :style="{ 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius' : info.inner.radius * 2 + 'rpx'}">
			<view class="posts-header">
				<view class="header-left">
					<image v-if="info.title.icon" webp="true" lazy-load="true" class="left-icon" mode="aspectFill" :src="info.title.icon" :style="{'width': info.title.iconWidth * 2 + 'rpx', 'height': info.title.iconHeight * 2 + 'rpx'}">
					</image>
					<view class="left-title" :style="{'color': info.title.color}">{{ info.title.txt }}</view>
				</view>
				<view @click="onClickMore" class="header-right">
					<view>{{ info.title.more_txt }}</view>
					<u-icon name="arrow-right" size="24" :color="info.options.color"></u-icon>
				</view>
			</view>
			<view class="zx-article-content">
				<block v-if="info.options.display == 1 || info.options.display == 2">
					<view @click="onClickItem(item)" v-for="(item, index) in info.list" :key="index" class="article-item" :class="[info.options.shadow ? 'common-shadow' : '', info.options.display == 2 ? 'pl16' : '']" :style="{'flex-direction': info.options.display == 1 ? 'row' : 'row-reverse', 'color': info.options.color, 'border-radius': info.options.radius * 2 + 'rpx', 'background-color': info.options.bgColor, 'margin-bottom': info.inner.gap * 2 + 'rpx'}">
						<view class="item-left">
							<image webp="true" lazy-load="true" class="item-cover" mode="aspectFill" :src="item.cover" :style="{'border-radius': info.options.radius * 2 + 'rpx'}"></image>
						</view>
						<view class="item-right">
							<view class="right-line item-title" :style="{'color': info.options.titleColor}">{{ item.title }}</view>
							<view v-if="item.desc" class="right-line">
								<view class="desc-txt">{{ item.desc }}</view>
							</view>
							<view class="right-line">
								<view>{{ item.s_time }}</view>
								<view class="right-item-box">
									<u-icon name="open-eye" custom-prefix="zx-icon" size="28" :color="info.options.color"></u-icon>
									<view class="right-num">{{ item.hits }}</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view @click="onClickItem(item)" v-for="(item, index) in info.list" :key="index" class="article-item-2" :class="[info.options.shadow ? 'common-shadow' : '']" :style="{'color': info.options.color, 'border-radius': info.options.radius * 2 + 'rpx', 'background-color': info.options.bgColor, 'margin-bottom': info.inner.gap * 2 + 'rpx'}">
						<view class="cover-root">
							<image webp="true" lazy-load="true" class="cover-img" mode="widthFix" :src="item.cover"></image>
						</view>
						<view class="item-content">
							<view class="content-line content-title" :style="{'color': info.options.titleColor}">{{ item.title }}</view>
							<view v-if="item.desc" class="content-line">
								<view class="desc-txt">{{ item.desc }}</view>
							</view>
							<view class="content-line">
								<view>{{ item.s_time }}</view>
								<view class="right-item-box">
									<u-icon name="open-eye" custom-prefix="zx-icon" size="28" :color="info.options.color"></u-icon>
									<view class="right-num">{{ item.hits }}</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-found",

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
				type: 1
			}
		},
		
		methods: {
			/**
			 * 更多
			 */
			onClickMore() {
				if (this.info.title.more_url) {
					this.$util.miniAppRoute(this.info.title.more_url)
				}
			},
			
			/**
			 * 详情
			 */
			onClickItem(item) {
				this.$util.miniAppRoute('/found/pages/detail/index?id=' + item.id)
			}
		}
	}
</script>

<style lang="less">
	.zx-article-root {
		box-sizing: border-box;

		.zx-article-box {
			box-sizing: border-box;
			
			.right-item-box {
				line-height: 1;
				.flex-c-aic();
			
				&:not(:last-child) {
					margin-right: @common-blank * 2;
				}
			
				.right-num {
					.num-ff();
					margin-left: @common-blank / 2;
				}
			}

			.posts-header {
				padding: 20rpx 0;
				.flex-c-aic-jcb();

				.header-left {
					.flex-c-aic();

					.left-icon {
						margin-right: @common-blank;
					}

					.left-title {
						font-weight: 500;
						font-size: @font-size-base;
					}
				}

				.header-right {
					.flex-c-aic();
					line-height: 1;
					color: @text-thirdly-color;
					font-size: @font-size-sm;
				}
			}

			.zx-article-content {
				
				.pl16 {
					padding-left: 16rpx;
				}

				.article-item {
					.flex-c();
					align-items: stretch;
				}
				
				.article-item-2 {
					overflow: hidden;
				}

				.item-left {
					padding: 10rpx;
					box-sizing: border-box;

					.item-cover {
						width: 180rpx;
						height: 180rpx;
						border-radius: 10rpx;
						overflow: hidden;
						vertical-align: middle;
					}
				}

				.item-right {
					flex: 1;
					overflow: hidden;
					padding: 16rpx 10rpx 10rpx;
					box-sizing: border-box;
					height: inherit;
					.flex-col-jcb();

					.right-line {
						.flex-c-aic-jcb();
						font-size: @font-size-xxs;
						line-height: 40rpx;
						
						.desc-txt {
							.line-1();
						}
					}

					.item-title {
						.line-2();
						color: @text-primary-color;
						font-size: @font-size-base;
						font-weight: 500;
					}
					
					.item-else-line {
						.flex-c-aic-jce();
					}
				}

				.cover-root {
					.wper-100();

					.cover-img {
						.wper-100();
						vertical-align: middle;
						overflow: hidden;
					}
				}

				.item-content {
					padding: 20rpx;
					box-sizing: border-box;
					line-height: 50rpx;

					.content-line {
						.flex-c-aic-jcb();
						font-size: @font-size-xxs;
							
						.desc-txt {
							.line-1();
						}
					}

					.content-title {
						.line-2();
						color: @text-primary-color;
						font-size: @font-size-base;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
