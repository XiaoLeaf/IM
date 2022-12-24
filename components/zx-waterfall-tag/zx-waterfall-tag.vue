<template>
	<view @click="onClickGoodsItem(goods)" class="waterfall-tag-root" :class="{'goods-shadow': options.shadow}" :style="{'border-radius': options.radius * 2 + 'rpx', 'background-color': options.bgColor, color: options.color}">
		<view class="waterfall-goods-img-box" :style="{height:imgH + 'rpx', 'border-top-left-radius': options.radius * 2 + 'rpx', 'border-top-right-radius': options.radius * 2 + 'rpx'}">
			<image webp="true" lazy-load="true" class="waterfall-goods-img" mode="aspectFill" :src="goods.cover"></image>
			<view v-if="goods.type == 1" class="common-flash-sale" :style="{'border-top-left-radius': options.radius * 2 + 'rpx', 'border-bottom-right-radius': options.radius * 4 + 'rpx', 'color': goods.badge.color, 'background-color': $u.colorToRgba(goods.badge.bgColor, .9)}">{{ goods.badge.text }}</view>
			<view v-if="goods.stock == 0 && indexConfig.goods.showSoldoutImage" class="waterfall-sellout-box">
				<image webp="true" lazy-load="true" mode="widthFix" :src="indexConfig.goods.soldoutImage" class="waterfall-sellout-img"></image>
			</view>
		</view>
		<view class="waterfall-goods-content">
			<view class="waterfall-goods-title" :style="{color: options.titleColor}">
				<text v-if="goods.typeStr" class="common-goods-type">{{ goods.typeStr }}</text>
				<text>{{ goods.title }}</text>
			</view>
			<view class="waterfall-goods-subtitle" :style="{color: options.subTitleColor}">{{ goods.subtitle }}</view>
			<!-- <view class="waterfall-goods-score">
				<text v-if="goods.score > 0">{{ goods.scoreStr }}</text>
			</view> -->
			<view class="waterfall-goods-footer">
				<view class="waterfall-price-box">
					<view>
						<text v-if="goods.is_so == 1" class="waterfall-goods-tag">特</text>
						<text class="waterfall-real-price" :style="{color: options.priceColor}"> {{ goods.real_price }}</text> 
						<text>{{ goods.real_price_ext ? goods.real_price_ext : '' }}</text>
					</view>
					<view v-if="goods.ori_price > 0" class="waterfall-ori-price">{{ goods.ori_price }}</view>
				</view>
				<view v-if="indexConfig.goods.showStock">{{ goods.stockStr }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-waterfall-tag",

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
	
	.waterfall-tag-root {
		.flex-col();
		background-color: #FFFFFF;
		box-sizing: border-box;
		overflow: hidden;
		.wper-100();
		
		.waterfall-goods-img-box {
			.wper-100();
			position: relative;
			overflow: hidden;
			
			.waterfall-goods-img {
				vertical-align: middle;
				.hper-100();
				.wper-100();
			}
			
			.waterfall-sellout-box {
				position: absolute;
				top: 0;
				left: 0;
				.wper-100();
				.hper-100();
				z-index: 10;
				background-color: rgba(0, 0, 0, .3);
				.flex-c-aic-jcc();
				
				.waterfall-sellout-img {
					width: 75%;
				}
			}
		}
		
		.waterfall-goods-content {
			padding: @padding-xs;
			box-sizing: border-box;
			
			.waterfall-goods-title {
				font-size: @font-size-sm;
				.line-2();
				line-height: 34rpx;
			}
			
			.waterfall-goods-subtitle {
				font-size: @font-size-sm - 2rpx;
				.line-1();
				margin-top: 10rpx;
				height: 36rpx;
				overflow: hidden;
			}
			
			.waterfall-goods-score {
				.common-goods-score();
				padding-top: 4rpx;
				.line-1();
			}
			
			.waterfall-goods-footer {
				.flex-c-aic-jcb();
				padding: @padding-xs / 2 0 0 0;
				font-size: @font-size-sm - 2rpx;
				
				.waterfall-price-box {
					.flex-c-aib();
					
					.waterfall-goods-tag {
						background-color: @text-primary-color;
						margin-right: 10rpx;
						border-radius: @border-radius-base / 2;
						color: #FFFFFF;
						font-size: @font-size-sm - 2rpx;
						padding: 0 4rpx;
					}
					
					.waterfall-real-price {
						font-weight: 700;
						font-size: @font-size-base;
					}
					
					.waterfall-ori-price {
						padding-left: 6rpx;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
