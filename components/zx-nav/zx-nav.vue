<template>
	<view class="nav-root" :style="{'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view class="inner-view" :style="{ 'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, height : info.inner.height * 2 + 'rpx', padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<view class="nav-box">
				<view @click="onClickThemeMenu(item)" class="item" v-for="(item, index) in info.list" :key="index" :style="{'width': 'calc(100% / ' + info.cols + ')', 'padding-left':index % info.cols == 0 ? '0rpx' : info.inner.gap + 'rpx', 'padding-right': index % info.cols == (info.cols - 1) ? '0rpx' : info.inner.gap + 'rpx', 'padding-bottom': index >= info.list.length - info.cols ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
					<image lazy-load="true" webp="true" mode="aspectFill" class="nav-img" :style="{ width : info.image.size * 2 + 'rpx', height : info.image.size * 2 + 'rpx', 'border-radius' : info.image.radius * 2 + 'rpx'}" :src="item.image"></image>
					<view :style="{ color : item.color ? item.color : info.font.color, 'font-size' : info.font.size * 2 + 'rpx'}" class="nav-txt">{{ item.text }}</view>
				</view>
			</view>
			<!-- <scroll-view :scroll-x="true" :scroll-with-animation="true" :scroll-left="scrollLeft" class="tabs-scroll" @scroll="onTabsScroll">
				<block v-for="(item, index) in 2" :key="index">
					<view class="tabs-scroll-content">
						<view @click="onClickThemeMenu(item)" class="item" v-for="(item, index) in info.list" :key="index" :style="{'width': 'calc(100% / ' + info.cols + ')', 'padding-left':index % info.cols == 0 ? '0rpx' : info.inner.gap + 'rpx', 'padding-right': index % info.cols == (info.cols - 1) ? '0rpx' : info.inner.gap + 'rpx', 'padding-bottom': index >= info.list.length - info.cols ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
							<image lazy-load="true" webp="true" mode="aspectFill" class="nav-img" :style="{ width : info.image.size * 2 + 'rpx', height : info.image.size * 2 + 'rpx', 'border-radius' : info.image.radius * 2 + 'rpx'}" :src="item.image"></image>
							<view :style="{ color : item.color ? item.color : info.font.color, 'font-size' : info.font.size * 2 + 'rpx'}" class="nav-txt">{{ item.text }}</view>
						</view>
						<view @click="onClickThemeMenu(item)" class="item" v-for="(item, index) in info.list" :key="index" :style="{'width': 'calc(100% / ' + info.cols + ')', 'padding-left':index % info.cols == 0 ? '0rpx' : info.inner.gap + 'rpx', 'padding-right': index % info.cols == (info.cols - 1) ? '0rpx' : info.inner.gap + 'rpx', 'padding-bottom': index >= info.list.length - info.cols ? '0rpx' : info.inner.gap * 2 + 'rpx'}">
							<image lazy-load="true" webp="true" mode="aspectFill" class="nav-img" :style="{ width : info.image.size * 2 + 'rpx', height : info.image.size * 2 + 'rpx', 'border-radius' : info.image.radius * 2 + 'rpx'}" :src="item.image"></image>
							<view :style="{ color : item.color ? item.color : info.font.color, 'font-size' : info.font.size * 2 + 'rpx'}" class="nav-txt">{{ item.text }}</view>
						</view>
					</view>
				</block>
			</scroll-view>
			<view class="indicator-root">
				<view class="indicator-box">
					<view class="indicator" :style="{left: indicatorLeft + 'rpx'}"></view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-nav",

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
				scrollLeft: 0.0, //scroll-view滑动距离
				indicatorLeft: 0.0, //指示器位置
				winWidth: 0, //父视图宽度
			}
		},

		created() {
			let systemInfo = uni.getSystemInfoSync()
			let screenWidth = systemInfo.windowWidth
			this.winWidth = screenWidth - this.info.outer.lr - this.info.inner.lr
		},

		methods: {
			/**
			 * 点击菜单item
			 */
			onClickThemeMenu(menu) {
				if (menu.url) {
					this.$util.miniAppRoute(menu.url)
				}
			},

			/**
			 * 监听scroll-view滚动
			 */
			onTabsScroll(event) {
				this.$u.debounce(this.fetchIndicatorPosition(event), 200)
			},

			/**
			 * 定位指示器位置
			 */
			fetchIndicatorPosition(event) {
				let scroll = event.detail
				let tabsWidth = scroll.scrollWidth * 2 - this.winWidth * 2
				let indicatorWidth = 30
				this.indicatorLeft = Math.ceil(scroll.scrollLeft * 2 / tabsWidth * indicatorWidth)
			},
		}
	}
</script>

<style lang="less" scoped>
	.nav-root {
		box-sizing: border-box;

		.inner-view {
			overflow: hidden;
			box-sizing: border-box;
			position: relative;

			.item {
				flex-shrink: 0;
				text-align: center;

				.nav-img {
					vertical-align: middle;
					overflow: hidden;
				}

				.nav-txt {
					padding-top: @padding-xs / 2;
				}
			}

			.nav-box {
				box-sizing: border-box;
				overflow: hidden;
				.flex-c();
				flex-wrap: wrap;
			}

			.tabs-scroll {
				.wper-100();
				white-space: nowrap;

				.tabs-scroll-content {
					.wper-100();
					.flex-c-aic();
					padding-bottom: @padding-xs / 2;
				}

				.tabs-scroll-box {
					width: 100%;
					// .flex-c();
				}
			}

			.indicator-root {
				position: absolute;
				bottom: 2rpx;
				left: 0;
				.wper-100();
				.flex-c-aic-jcc();
				overflow: hidden;
				opacity: .8;

				.indicator-box {
					height: 8rpx;
					background-color: rgba(0, 0, 0, .1);
					border-radius: 100rpx;
					width: 60rpx;
					position: relative;
					overflow: hidden;

					.indicator {
						position: absolute;
						left: 0;
						top: 0;
						width: 30rpx;
						.hper-100();
						border-radius: 100rpx;
						background-color: @primary-color;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
