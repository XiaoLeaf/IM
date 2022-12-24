<template>
	<view @click="onClickGoodsItem(goods)" class="goods-list-tag-root" :class="{'goods-shadow': options.shadow}" :style="{'border-radius': options.radius * 2 + 'rpx', 'background-color': options.bgColor, color: options.color}">
		<view class="goods-img-box" :style="{'border-top-left-radius': options.radius * 2 + 'rpx', 'border-bottom-left-radius': options.radius * 2 + 'rpx'}">
			<image webp="true" lazy-load="true" class="goods-img" mode="heightFix" :src="goods.cover"></image>
			<view v-if="goods.type == 1" class="common-flash-sale" :style="{'border-top-left-radius': options.radius * 2 + 'rpx', 'border-bottom-right-radius': options.radius * 4 + 'rpx', 'color': goods.badge.color, 'background-color': $u.colorToRgba(goods.badge.bgColor, .9)}">{{ goods.badge.text }}</view>
			<view v-if="goods.stock == 0 && indexConfig.goods.showSoldoutImage" class="sellout-box">
				<image webp="true" lazy-load="true" mode="widthFix" :src="indexConfig.goods.soldoutImage" class="sellout-img"></image>
			</view>
		</view>
		<view class="goods-content">
			<text class="goods-title" :style="{color:options.titleColor}">
				<text v-if="goods.typeStr" class="common-goods-type">{{ goods.typeStr }}</text>
				<text>{{ goods.title }}</text>
			</text>
			<view class="goods-subtitle" :style="{color: options.subTitleColor}">
				<text class="goods-subtitle-txt">{{ goods.subtitle }}</text>
			</view>
			<!-- <view class="goods-score">
				<text v-if="goods.score > 0">{{ goods.scoreStr }}</text>
			</view> -->
			<view class="goods-footer">
				<view class="price-box">
					<view>
						<text v-if="goods.is_so == 1" class="goods-tag">特</text>
						<text class="real-price" :style="{color: options.priceColor}">{{ goods.real_price }}</text> 
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
		name:"zx-list-tag",
		
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
	
	.goods-list-tag-root {
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.flex-c();
		overflow: hidden;
		
		.goods-img-box {
			height: inherit!important;
			position: relative;
			overflow: hidden;
		
			.goods-img {
				vertical-align: middle;
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
			.flex-col-jcb();
			padding: @padding-xs;
			box-sizing: border-box;
			flex: 1;
			font-size: @font-size-sm - 2rpx;
			overflow: hidden;
			
			.goods-title {
				font-size: @font-size-sm;
				.line-2();
				line-height: 34rpx;
				height: 68rpx;
			}
			
			.goods-subtitle {
				margin-top: @common-blank;
				height: 36rpx;
				
				.goods-subtitle-txt {
					.line-1();
				}
			}
			
			.goods-score {
				.common-goods-score();
				.line-1();
				overflow: hidden;
			}
			
			.goods-footer {
				.flex-c-aic-jcb();
				font-size: @font-size-sm - 2rpx;
				
				.price-box {
					.flex-c-aib();
					
					.goods-tag {
						background-color: @text-primary-color;
						margin-right: 10rpx;
						border-radius: 4rpx;
						color: #FFFFFF;
						font-size: @font-size-sm - 2rpx;
						padding: 0 4rpx;
					}
					
					.real-price {
						font-size: @font-size-base;
						font-weight: 700;
					}
					
					.ori-price {
						padding-left: 6rpx;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
