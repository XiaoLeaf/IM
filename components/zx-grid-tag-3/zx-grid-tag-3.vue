<template>
	<view @click="onClickGoodsItem(goods)" class="grid-tag-3-root" :class="{'goods-shadow': options.shadow}" :style="{'border-radius': options.radius * 2 + 'rpx', 'background-color': options.bgColor, color: options.color}">
		<view class="goods-img-box" :style="{height: imgH + 'rpx', 'border-top-left-radius': options.radius * 2 + 'rpx', 'border-top-right-radius': options.radius * 2 + 'rpx'}">
			<image webp="true" lazy-load="true" mode="aspectFill" :src="goods.cover" class="goods-img"></image>
			<view v-if="goods.type == 1" class="common-flash-sale" :style="{'border-top-left-radius': options.radius * 2 + 'rpx', 'border-bottom-right-radius': options.radius * 4 + 'rpx', 'color': goods.badge.color, 'background-color': $u.colorToRgba(goods.badge.bgColor, .9)}">{{ goods.badge.text }}</view>
			<view v-if="goods.stock == 0 && indexConfig.goods.showSoldoutImage" class="sellout-box">
				<image webp="true" lazy-load="true" mode="widthFix" :src="indexConfig.goods.soldoutImage" class="sellout-img"></image>
			</view>
		</view>
		<view class="goods-content">
			<view class="goods-title" :style="{color: options.titleColor}">
				<text v-if="goods.typeStr" class="common-goods-type">{{ goods.typeStr }}</text>
				<text>{{ goods.title }}</text>
			</view>
			<!-- <view class="goods-score">
				<text v-if="goods.score > 0">{{ goods.scoreStr }}</text>
			</view> -->
			<view class="price-box">
				<view>
					<text v-if="goods.is_so == 1" class="goods-tag">特</text>
					<text class="real-price" :style="{color: options.priceColor}">{{ goods.real_price }}</text>
					{{ goods.real_price_ext ? goods.real_price_ext : '' }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zx-grid-tag-3",

		props: {
			options: {
				type: Object,
				default () {
					return {

					}
				}
			},

			goods: {
				type: Object,
				default () {
					return {

					}
				}
			},

			imgH: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {

			}
		},

		methods: {
			onClickGoodsItem(goods) {
				this.$util.miniAppRoute('/goods/pages/detail/index?id=' + goods.id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-shadow {
		box-shadow: 0px 0px 10px #eee;
	}

	.grid-tag-3-root {
		.flex-col();
		background-color: #FFFFFF;
		box-sizing: border-box;
		overflow: hidden;
		
		.goods-img-box {
			.wper-100();
			position: relative;
			overflow: hidden;

			.goods-img {
				vertical-align: middle;
				.wper-100();
				.hper-100();
			}
			
			.sellout-box {
				position: absolute;
				top: 0;
				left: 0;
				.wper-100();
				.hper-100();
				z-index: 10;
				background-color: rgba(0, 0, 0, .3);
				.flex-c-aic-jcc();
				
				.sellout-img {
					width: 75%;
				}
			}
		}

		.goods-content {
			padding: @padding-xs;
			box-sizing: border-box;

			.goods-title {
				font-size: @font-size-sm;
				.line-1();
				line-height: 36rpx;
			}
			
			.goods-score {
				.common-goods-score();
				.line-1();
				overflow: hidden;
			}

			.price-box {
				.flex-c-aic-jcb();
				padding-top: @padding-xs / 2;
				font-size: @font-size-xs;

				.goods-tag {
					background-color: @text-primary-color;
					margin-right: 10rpx;
					border-radius: @border-radius-base / 2;
					color: #FFFFFF;
					font-size: @font-size-xs;
					padding: 0 4rpx;
				}

				.real-price {
					font-weight: 700;
					font-size: @font-size-base;
				}
			}
		}
	}
</style>
