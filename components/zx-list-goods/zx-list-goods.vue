<template>
	<view @click="onClickGoodsItem(goods)" class="root" :style="rootStyle">
		<view class="goods-img-box">
			<image webp="true" lazy-load="true" class="goods-img" mode="heightFix" :src="goods.cover"></image>
			<view v-if="goods.type == 1" class="common-flash-sale flash-sale-box" :style="{'color': goods.badge.color, 'background-color': $u.colorToRgba(goods.badge.bgColor, .9)}">{{ goods.badge.text }}</view>
			<view v-if="goods.stock == 0 && indexConfig.goods.showSoldoutImage" class="sellout-box">
				<image webp="true" lazy-load="true" mode="widthFix" :src="indexConfig.goods.soldoutImage" class="sellout-img"></image>
			</view>
		</view>
		<view class="content-box">
			<text class="goods-title">
				<text v-if="goods.typeStr" class="common-goods-type">{{ goods.typeStr }}</text>
				<text>{{ goods.title }}</text>
			</text>
			<text class="goods-subtitle">{{ goods.subtitle }}</text>
			<!-- <view class="goods-score">
				<text v-if="goods.score > 0">{{ goods.scoreStr }}</text>
			</view> -->
			<view class="price-box">
				<view class="price-container">
					<view>
						<text class="price" :style="{color: options.priceColor}">{{ goods.real_price }}</text> 
						{{ goods.real_price_ext ? goods.real_price_ext : '' }}
					</view>
					<view v-if="goods.ori_price > 0" class="ori-price">{{ goods.ori_price }}</view>
				</view>
				<view v-if="indexConfig.goods.showStock">{{ goods.stockStr }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-list-goods",
		
		props: {
			goods: {
				type: Object,
				default() {
					return {
						
					}
				}
			},
			
			rootStyle: {
				type: String,
				default: ''
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			/**
			 * 查看商品详情
			 */
			onClickGoodsItem: function(goods) {
				this.$util.miniAppRoute('/goods/pages/detail/index?id=' + this.goods.id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.root-shadow {
		box-shadow: 0px 0px 10px #eee;
	}
	
	.root {
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.flex-c();
		overflow: hidden;
		.root-shadow();
		margin-bottom: @common-blank;
		border-radius: @border-radius-base;
		
		.goods-img-box {
			height: inherit!important;
			position: relative;
			overflow: hidden;
		
			.goods-img {
				vertical-align: middle;
				.hper-100();
			}
			
			.flash-sale-box {
				border-bottom-right-radius: @border-radius-base * 2;
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
		
		.content-box {
			.flex-col-jcb();
			padding: @padding-xs;
			box-sizing: border-box;
			flex: 1;
			font-size: @font-size-xs;
			overflow: hidden;
			color: @text-thirdly-color;
			
			.goods-title {
				font-size: @font-size-sm;
				.line-2();
				line-height: 34rpx;
				height: 68rpx;
				color: @text-primary-color;
			}
			
			.goods-subtitle {
				margin: @common-blank 0;
				.line-1();
				height: 28rpx;
				overflow: hidden;
			}
			
			.goods-score {
				.common-goods-score();
				.line-1();
				overflow: hidden;
			}
			
			.price-box {
				.flex-c-aic-jcb();
				font-size: @font-size-xs;
				
				.price-container {
					.flex-c-aib();
					flex: 1;
					overflow: hidden;
					
					.price {
						font-weight: 700;
						font-size: @font-size-base;
						color: @red-color;
					}
					
					.ori-price {
						padding-left: 6rpx;
						text-decoration: line-through
					}
				}
			}
		}
	}
</style>
