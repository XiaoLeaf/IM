<template>
	<view class="goods-root" :style="{'background-color':(info.outer.bgColor ? info.outer.bgColor : '#f9f9f9'), padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="content">
			<view v-if="info.options.bannerShow" class="header">
				<image @click="onClickBanner" webp="true" lazy-load="true" mode="widthFix" class="header-img" :src="info.options.banner"></image>
			</view>
			<view v-if="info.options.display == 4" class="horizontal-box" :style="{'background-color':info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius':info.inner.radius * 2 + 'rpx'}">
				<scroll-view :scroll-x="true" class="horizontal-scroll">
					<view class="horizontal-scroll-box">
						<view class="horizontal-goods-box">
							<view v-for="(item, index) in info.list" :key="index" class="horizontal-tag-item" :style="{'width': (750 - info.outer.lr * 4 - info.inner.lr * 4 - info.inner.gap * 2 * 5)/3 + 'rpx', 'margin-left': index == 0 ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
								<zx-grid-tag-3 :goods="item" :options="info.options" :imgH="(750 - info.outer.lr * 4 - info.inner.lr * 4 - info.inner.gap * 2 * 5)/3"></zx-grid-tag-3>
							</view>
						</view>
						<view v-if="info.list.length > 3 && info.options.moreImage" class="horizontal-more-item" :style="{'margin-left': info.inner.gap * 2 + 'rpx'}">
							<image @click="onClickMoreImg" :style="{'border-radius': info.options.radius * 2 + 'rpx'}" lazy-load="true" webp="true" mode="aspectFill" class="more-test-img" :src="info.options.moreImage"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-else-if="info.options.display == 3" class="tag-3-box" :style="{'background-color':info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius':info.inner.radius * 2 + 'rpx'}">
				<view v-for="(item, index) in info.list" :key="index" class="tag-3-item" :style="{'padding-left': index % 3 == 0 ? '0rpx' : index % 3 == 1 ? info.inner.gap * 4 / 6 + 'rpx' : info.inner.gap * 4 / 3 + 'rpx', 'padding-right': index % 3 == 0 ? info.inner.gap * 4 / 3 + 'rpx' : index % 3 == 1 ? info.inner.gap * 4 / 6 + 'rpx' : '0rpx', 'padding-bottom': index >= info.list.length - info.options.display ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
					<zx-grid-tag-3 :goods="item" :options="info.options" :imgH="(750 - info.outer.lr * 4 - info.inner.lr * 4 - info.inner.gap * 2 * 2)/3"></zx-grid-tag-3>
				</view>
			</view>
			<!-- <view v-else-if="info.options.display == 2" class="tag-2-box" :style="{'background-color':info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius':info.inner.radius * 2 + 'rpx'}">
				<view v-for="(item, index) in info.list" :key="index" class="tag-2-item" :style="{'padding-left': index % 2 == 0 ? '0px' : info.inner.gap + 'rpx', 'padding-right': index % 2 == 0 ? info.inner.gap + 'rpx' : '0px', 'padding-bottom': index >= info.list.length - info.options.display ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
					<zx-grid-tag :goods="item" :options="info.options" :imgH="(750 - info.outer.lr * 4 - info.inner.lr * 4 - info.inner.gap * 2)/2"></zx-grid-tag>
				</view>
			</view> -->
			<view v-else-if="info.options.display == 2" class="tag-2-box" :style="{'background-color':info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius':info.inner.radius * 2 + 'rpx'}">
				<view class="waterfall-side-box">
					<view v-for="(item, index) in flowObj.left" :key="index" class="tag-waterfall-item" :style="{'padding-right': info.inner.gap + 'rpx', 'padding-bottom': info.inner.gap * 2 + 'rpx'}">
						<zx-waterfall-tag :goods="item" :options="info.options" :imgH="imgH"></zx-waterfall-tag>
					</view>
				</view>
				<view class="waterfall-side-box">
					<view v-for="(item, index) in flowObj.right" :key="index" class="tag-waterfall-item" :style="{'padding-left': info.inner.gap + 'rpx', 'padding-bottom': info.inner.gap * 2 + 'rpx'}">
						<zx-waterfall-tag :goods="item" :options="info.options" :imgH="imgH"></zx-waterfall-tag>
					</view>
				</view>
			</view>
			<view v-else="info.options.display == 1" class="tag-list-box" :style="{'background-color':info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx', 'border-radius':info.inner.radius * 2 + 'rpx'}">
				<view class="tag-list-item" v-for="(item, index) in info.list" :key="index" :style="{'padding-bottom': index >= info.list.length - 1 ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
					<zx-list-tag class="tag-list-item" :goods="item" :options="info.options"></zx-list-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-goods",
		
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
		
		computed: {
			imgH() {
				let height = (750 - this.info.outer.lr * 4 - this.info.inner.lr * 4 - this.info.inner.gap * 2)/2
				return height
			},
			
			flowObj() {
				let left = [], right = []
				this.info.list.forEach((element, index) => {
					if (index % 2 == 0 && left.length <= right.length) {
						left.push(element)
					} else {
						right.push(element)
					}
				})
				return {left, right}
			},
		},
		
		methods: {
			onClickBanner() {
				if (this.info.options.url) {
					this.$util.miniAppRoute(this.info.options.url)
				}
			},
			
			/**
			 * 查看更多
			 */
			onClickMoreImg() {
				if (this.info.options.url) {
					this.$util.miniAppRoute(this.info.options.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-root {
		box-sizing: border-box;
		
		.horizontal-more-item {
			display: inline-block;
			box-sizing: border-box;
			
			.more-test-img {
				width: 202rpx;
				height: 328rpx;
				vertical-align: middle;
				display: block;
				overflow: hidden;
			}
		}
		
		.content {
			.flex-col-aic-jcc();
			.wper-100();
			
			.header {
				.wper-100();
				.flex-c-aic();
				
				.header-img {
					.wper-100();
				}
			}
			
			.tag-3-box {
				.wper-100();
				overflow: hidden;
				box-sizing: border-box;
				.flex-c();
				flex-wrap: wrap;
				
				.tag-3-item {
					width: 33.33%;
					box-sizing: border-box;
				}
			}
			
			.tag-2-box {
				.wper-100();
				overflow: hidden;
				box-sizing: border-box;
				.flex-c();
				flex-wrap: wrap;
				
				.tag-2-item {
					width: 50%;
					box-sizing: border-box;
				}
				
				.tag-waterfall-item {
					.wper-100();
					box-sizing: border-box;
				}
				
				.waterfall-side-box {
					flex: 1;
				}
			}
			
			.tag-list-box {
				.wper-100();
				.flex-c();
				flex-wrap: wrap;
				overflow: hidden;
				box-sizing: border-box;
				
				.tag-list-item {
					.wper-100();
				}
			}
			
			.horizontal-box {
				.wper-100();
				box-sizing: border-box;
				
				.horizontal-scroll {
					.wper-100();
					white-space: nowrap;
					
					.horizontal-scroll-box {
						.flex-c();
						
						.horizontal-goods-box {
							.flex-c();
							
							.horizontal-tag-item {
								box-sizing: border-box;
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>
