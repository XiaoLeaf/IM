<template>
	<view class="root" :style="{ 'background-color' : info.outer.bgColor, padding: info.outer.t * 2 + 'rpx ' + info.outer.lr * 2 + 'rpx ' + info.outer.b * 2 + 'rpx'}">
		<view v-if="info.inner.class == 1">
			<view class="box1" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 4}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 4 ? '100%!important' : '', 'padding-bottom': info.list.length <= 4 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img"
					 :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
		<view v-else-if="info.inner.class == 2">
			<view class="box2" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 4}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 4 ? '100%!important' : '', 'padding-bottom': info.list.length <= 4 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img" :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
		<view v-else-if="info.inner.class == 3">
			<view class="box3" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 5}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 5 ? '100%!important' : '', 'padding-bottom': info.list.length <= 5 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img"
					 :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
		<view v-else-if="info.inner.class == 4">
			<view class="box4" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 5}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 5 ? '100%!important' : '', 'padding-bottom': info.list.length <= 5 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img"
					 :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
		<view v-else-if="info.inner.class == 5">
			<view class="box5" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 3}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 3 ? '100%!important' : '', 'padding-bottom': info.list.length <= 3 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img"
					 :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="box6" :style="{'border-radius' : info.inner.radius * 2 + 'rpx' , 'background-color' : info.inner.bgColor, padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
				<view @click="onClickCubeImage(item)" class="image-box" :class="{'item' : info.list.length <= 3}" v-for="(item, index) in info.list" :key="index" :style="{'width': info.list.length > 3 ? '100%!important' : '', 'padding-bottom': info.list.length <= 3 ? '0rpx' : index < info.list.length - 1 ? '10rpx' : '0rpx'}">
					<image webp="true" lazy-load="true" mode="widthFix" :src="item.image" class="cube-img"
					 :style="{ 'border-radius' : info.image.radius * 2 + 'rpx'}"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-cube",
		
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
			onClickCubeImage(image) {
				if (image.url) {
					this.$util.miniAppRoute(image.url)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.root {
		box-sizing: border-box;
		
		.cube-box {
			.flex-c();
			flex-wrap: wrap;
			position: relative;
			overflow: hidden;
			box-sizing: border-box;
		}
		
		.cube-box-reverse {
			display: flex;
			flex-direction: row-reverse;
			position: relative;
			overflow: hidden;
			box-sizing: border-box;
		}
		
		.image-box {
			box-sizing: border-box;
		
			.cube-img {
				vertical-align: middle;
				width: 100%;
				overflow: hidden;
			}
		}
		
		.box1 {
			.cube-box();
		}
		
		.box1 .item:nth-child(1) {
			width: 50%;
			padding-right: 5px;
		}
		
		.box1 .item:nth-child(2) {
			width: 50%;
			height: 0%;
			padding-bottom: 5px;
		}
		
		.box1 .item:nth-child(3) {
			width: 25%;
			position: absolute;
			left: 50%;
			top: calc(50% + 5px);
			padding-right: 2.5px;
		}
		
		.box1 .item:nth-child(4) {
			width: 25%;
			position: absolute;
			right: 0;
			top: calc(50% + 5px);
			padding-left: 2.5px;
		}
		
		.box2 {
			.cube-box-reverse();
		}
		
		.box2 .item:nth-child(1) {
			width: 50%;
			padding-left: 5px;
		}
		
		.box2 .item:nth-child(2) {
			width: 50%;
			height: 0%;
			padding-bottom: 5px;
		}
		
		.box2 .item:nth-child(3) {
			width: 25%;
			position: absolute;
			left: 0;
			top: calc(50% + 5px);
			padding-right: 2.5px;
		}
		
		.box2 .item:nth-child(4) {
			width: 25%;
			position: absolute;
			left: 25%;
			top: calc(50% + 5px);
			padding-left: 2.5px;
		}
		
		.box3 {
			.cube-box();
		}
		
		.box3 .item:nth-child(1) {
			width: 50%;
			padding-right: 5px;
		}
		
		.box3 .item:nth-child(2) {
			width: 25%;
			height: 0%;
			padding-right: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box3 .item:nth-child(3) {
			width: 25%;
			height: 0%;
			padding-left: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box3 .item:nth-child(4) {
			width: 25%;
			position: absolute;
			left: 50%;
			top: 50%;
			padding-right: 2.5px;
			padding-top: 2.5px;
		}
		
		.box3 .item:nth-child(5) {
			width: 25%;
			position: absolute;
			right: 0;
			top: 50%;
			padding-left: 2.5px;
			padding-top: 2.5px;
		}
		
		.box4 {
			.cube-box-reverse();
		}
		
		.box4 .item:nth-child(1) {
			width: 50%;
			padding-left: 5px;
		}
		
		.box4 .item:nth-child(2) {
			width: 25%;
			height: 0%;
			padding-left: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box4 .item:nth-child(3) {
			width: 25%;
			height: 0%;
			padding-right: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box4 .item:nth-child(4) {
			width: 25%;
			position: absolute;
			left: 0;
			top: 50%;
			padding-right: 2.5px;
			padding-top: 2.5px;
		}
		
		.box4 .item:nth-child(5) {
			width: 25%;
			position: absolute;
			left: 25%;
			top: 50%;
			padding-left: 2.5px;
			padding-top: 2.5px;
		}
		
		.box5 {
			.cube-box();
		}
		
		.box5 .item {
			width: 50%;
		}
		
		.box5 .item:nth-child(1) {
			height: 0%;
			padding-right: 2.5px;
		}
		
		.box5 .item:nth-child(2) {
			height: 0%;
			padding-left: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box5 .item:nth-child(3) {
			height: 0%;
			position: absolute;
			left: 50%;
			top: 50%;
			padding-left: 2.5px;
			padding-top: 2.5px;
		}
		
		.box6 {
			.cube-box-reverse();
		}
		
		.box6 .item {
			width: 50%;
		}
		
		.box6 .item:nth-child(1) {
			height: 0%;
			padding-left: 2.5px;
		}
		
		.box6 .item:nth-child(2) {
			height: 0%;
			padding-right: 2.5px;
			padding-bottom: 2.5px;
		}
		
		.box6 .item:nth-child(3) {
			height: 0%;
			position: absolute;
			left: 0;
			top: 50%;
			padding-right: 2.5px;
			padding-top: 2.5px;
		}
	}
</style>
