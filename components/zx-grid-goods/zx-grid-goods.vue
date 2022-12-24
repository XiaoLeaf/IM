<template>
	<view class="root" @click="onClickGoodsItem(goods)">
		<view class="goods-img-box">
			<image webp="true" lazy-load="true" class="goods-image" mode="aspectFill" :src="goods.cover"></image>
			<view v-if="goods.type == 1" class="common-flash-sale flash-sale-box" :style="{'color': goods.badge.color, 'background-color': $u.colorToRgba(goods.badge.bgColor, .9)}">{{ goods.badge.text }}</view>
			<view v-if="goods.stock == 0 && indexConfig.goods.showSoldoutImage" class="sellout-box">
				<image webp="true" lazy-load="true" mode="widthFix" :src="indexConfig.goods.soldoutImage" class="sellout-img"></image>
			</view>
		</view>
		<view class="content-box">
			<view class="goods-title">
				<text v-if="goods.typeStr" class="common-goods-type">{{ goods.typeStr }}</text>
				<text>{{ goods.title }}</text>
			</view>
			<view class="goods-subtitle">
				<text class="goods-subtitle-txt">{{ goods.subtitle }}</text>
			</view>
			<!-- <view class="goods-score">
				<text v-if="goods.score > 0">{{ goods.scoreStr }}</text>
			</view> -->
			<view class="price-box">
				<view class="price-container">
					<view>
						<text class="price">
						{{ goods.real_price }}</text> {{ goods.real_price_ext ? goods.real_price_ext : '' }}
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
		name:"zx-grid-goods",
		
		props: {
			options: {
				type: Object,
				default() {
					return {
						
					}
				}
			},
			
			goods: {
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
			 * 查看商品详情
			 */
			onClickGoodsItem() {
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
		.flex-col();
		background-color: #FFFFFF;
		box-sizing: border-box;
		overflow: hidden;
		.root-shadow();
		width: 360rpx;
		border-radius: @border-radius-base;
		margin-bottom: @common-blank;
		
		.goods-img-box {
			height: 360rpx;
			border-top-left-radius: @border-radius-base;
			border-top-right-radius: @border-radius-base;
			overflow: hidden;
			position: relative;
			
			.flash-sale-box {
				border-bottom-right-radius: @border-radius-base * 2;
			}
			
			.goods-image {
				.wper-100();
				.hper-100();
				vertical-align: middle;
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
			padding: @padding-xs;
			box-sizing: border-box;
			
			.goods-title {
				font-size: @font-size-sm;
				line-height: 34rpx;
				height: 68rpx;
				.line-2();
				color: @text-primary-color;
			}
			
			.goods-subtitle {
				font-size: @font-size-xs;
				padding: @padding-xs / 2 0;
				height: 46rpx;
				overflow: hidden;
				color: @text-thirdly-color;
				
				.goods-subtitle-txt {
					.line-1();
				}
			}
			
			.goods-score {
				.common-goods-score();
				.line-1();
				overflow: hidden;
			}
			
			.price-box {
				.flex-c-aic-jcb();
				font-size: @font-size-xs;
				color: @text-thirdly-color;
				
				.price-container {
					.flex-c-aib();
					
					.price {
						font-weight: 700;
						font-size: @font-size-base;
						color: #CC0000;
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
