<template>
	<view class="area-picker-root">
		<view class="title">请选择地区</view>
		<view class="header">
			<view @click="onClickHeaderRegionItem(0)" class="header-item">{{ resultList[0].n ? resultList[0].n : '请选择' }}</view>
			<view @click="onClickHeaderRegionItem(1)" class="header-item">{{ resultList[1] ? resultList[1].n : '' }}</view>
			<view @click="onClickHeaderRegionItem(2)" class="header-item">{{ resultList[2] ? resultList[2].n : '' }}</view>
		</view>
		<view class="cotent">
			<swiper @change="onSwiperChange" :current="current" class="content-swiper">
				<swiper-item>
					<scroll-view :scroll-into-view="provinceId" class="content-scroll" scroll-y="true">
						<view :id="'item-' + proIndex" v-for="(proItem, proIndex) in provinceList" :key="proIndex" @click="onClickRegionItem(0, proItem, proIndex)"
						 class="content-item" :class="{'active' : proIndex==provinceActive, 'inactive': proIndex!=provinceActive}">{{ proItem.n }}</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-into-view="cityId" class="content-scroll" scroll-y="true">
						<view :id="'item-' + cityIndex" v-for="(cityItem, cityIndex) in cityList" :key="cityIndex" @click="onClickRegionItem(1, cityItem, cityIndex)"
						 class="content-item" :class="{'active' : cityIndex==cityActive, 'inactive': cityIndex!=cityActive}">{{ cityItem.n }}</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-into-view="countyId" class="content-scroll" scroll-y="true">
						<view :id="'item-' + countyIndex" v-for="(countyItem, countyIndex) in countyList" :key="countyIndex" @click="onClickRegionItem(2, countyItem, countyIndex)"
						 class="content-item" :class="{'active' : countyIndex==countyActive, 'inactive': countyIndex!=countyActive}">{{ countyItem.n }}</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import areaJson from '@/static/files/newarea.js'
	let defJson = { 'n': '请选择' }
	export default {
		name:"zx-area-picker",
		
		props: {
			defaultVal: {
				type: [String, Number],
				default: ''
			}
		},
		
		data() {
			return {
				resultList: [],
				provinceList: [],
				cityList: [],
				countyList: [],
				current: 0,
				provinceActive: -1,
				cityActive: -1,
				countyActive: -1,
				provinceId: null,
				cityId: null,
				countyId: null,
				idsJson: null,
			}
		},
		
		created() {
			this.fetchIdJson()
			this.configPickerData()
		},
		
		methods: {
			/**
			 * 初始化数据
			 */
			configPickerData() {
				let tempRes = ['', '', '']
				let tempProId = null
				let tempCityId = null
				let tempCountyId = null
				let tempCurrent = 0
				let tempPro = this.getList(0)
				let proActive = -1
				let tempCity = []
				let cityActive = -1
				let tempCounty = []
				let countyActive = -1
				let defaultVal = this.defaultVal
				if (defaultVal) {
					let res = this.idsJson[defaultVal]
					if (res.p) {
						proActive = this.getIndex(tempPro, res.p)
						tempCity = this.getList(1, res.p)
						tempRes[0] = {
							n: this.getNameByCode(tempPro, res.p),
							id: res.p
						}
						tempRes[1] = defJson
						tempRes[2] = defJson
						tempProId = 'item-' + (proActive - 2)
					}
					if (res.c && tempCity) {
						cityActive = this.getIndex(tempCity, res.c)
						tempCounty = this.getCountyListByCityList(tempCity, res.c)
						tempCurrent = 1
						tempRes[1] = {
							n: this.getNameByCode(tempCity, res.c),
							id: res.c
						}
						tempRes[2] = defJson
						tempCityId = 'item-' + (cityActive - 2)
					}
					if (res.a && tempCounty) {
						countyActive = this.getIndex(tempCounty, res.a)
						tempCurrent = 2
						tempRes[2] = {
							n: this.getNameByCode(tempCounty, res.a),
							id: res.a
						}
						tempCountyId = 'item-' + (countyActive - 2)
					} else {
						tempCurrent = 2
					}
				}
			
				this.resultList = tempRes
				this.provinceList = tempPro
				this.cityList = tempCity
				this.countyList = tempCounty
				this.provinceActive = proActive
				this.cityActive = cityActive
				this.countyActive = countyActive
				this.current = tempCurrent
				setTimeout(() => {
					this.provinceId = tempProId
					this.cityId = tempCityId
					this.countyId = tempCountyId
					// this.$forceUpdate()
				}, 200)
				// console.log('resultList===>', JSON.stringify(this.resultList))
				// console.log('provinceList===>', JSON.stringify(this.provinceList))
				// console.log('cityList===>', JSON.stringify(this.cityList))
				// console.log('countyList===>', JSON.stringify(this.countyList))
				// console.log('provinceActive===>', JSON.stringify(this.provinceActive))
				// console.log('cityActive===>', JSON.stringify(this.cityActive))
				// console.log('countyActive===>', JSON.stringify(this.countyActive))
				// console.log('current===>', JSON.stringify(this.current))
			},
			
			/**
			 * 过滤idJson
			 */
			fetchIdJson() {
				let tempIdJson = {}
				for (var i = 0; i < areaJson.areaList.length; i++) {
					let province = areaJson.areaList[i]
					tempIdJson[province.id] = {p: province.id}
					for (var j = 0; j < province.c.length; j++) {
						let city = province.c[j]
						tempIdJson[city.id] = {p: province.id, c: city.id}
						for(var k = 0; k < city.c.length; k++) {
							let county = city.c[k]
							tempIdJson[county.id] = {p: province.id, c: city.id, a: county.id}
						}
					}
				}
				this.idsJson = tempIdJson
			},
			
			/**
			 * @param {类型： 0：省； 1：市； 2： 区} type
			 * @param {父级code： 在type==1||type==2时必传} code  
			 */
			getList(type, code) {
				let tempList = []
				switch (type) {
					case 0:
						{
							areaJson.areaList.forEach(e => {
								tempList.push({
									n: e.n,
									id: e.id
								})
							})
						}
						break;
					case 1:
						{
							areaJson.areaList.forEach(e => {
								if (e.id === code) {
									tempList = e.c
								}
							})
						}
						break;
					case 2:
						{
							this.cityList.forEach(e => {
								if (e.id === code) {
									tempList = e.c
								}
							})
						}
						break;
			
					default:
						break;
				}
				return tempList
			},
			
			/**
			 * @param {城市列表} cityList 
			 * @param {城市code} code 
			 */
			getCountyListByCityList(cityList, code) {
				let tempList = []
				cityList.forEach(e => {
					if (e.id === code) {
						tempList = e.c
					}
				})
				return tempList
			},
			
			/**
			 * @param {地址数据数组} list 
			 * @param {匹配的code} code 
			 */
			getIndex(list, code) {
				let position = 0
				for (let i = 0; i < list.length; i++) {
					const element = list[i]
					if (element.id === code) {
						position = i
						break
					}
				}
				return position
			},
			
			/**
			 * @param {地址数据数组} list 
			 * @param {匹配的code} code 
			 */
			getNameByCode(list, code) {
				let name = ''
				for (let i = 0; i < list.length; i++) {
					const element = list[i]
					if (element.id === code) {
						name = element.n
						break
					}
				}
				return name
			},
			
			/**
			 * header点击
			 */
			onClickHeaderRegionItem(index) {
				this.current = index
			},
			
			/**
			 * 点击区域item
			 */
			onClickRegionItem(type, region, index) {
				switch (type) {
					case 0:
						{
							this.resultList = [region, defJson, '']
							this.cityList = this.getList(type + 1, region.id)
							this.current = type + 1
							this.provinceActive = index
							this.cityActive = -1
							this.countyActive = -1
						}
						break;
					case 1:
						{
							this.$set(this.resultList, 1, {
								n: region.n,
								id: region.id
							})
							this.$set(this.resultList, 2, defJson)
							this.countyList = this.getList(type + 1, region.id)
							this.current = type + 1
							this.cityActive = index
							this.countyActive = -1
						}
						break;
					case 2:
						{
							this.$set(this.resultList, 2, region)
							this.countyActive = index
							this.$emit('complete', this.resultList)
						}
						break;
			
					default:
						break;
				}
			},
			
			/**
			 * swiper的change
			 */
			onSwiperChange(e) {
				this.current = e.detail.current
			}
		}
	}
</script>

<style lang="less" scoped>
	.area-picker-root {
		.flex-col();
		background-color: #FFFFFF;
		height: 50vh;
		
		.title {
			font-size: @font-size-base;
			color: @text-secondary-color;
			padding: @padding-xs;
			box-sizing: border-box;
			font-weight: 700;
		}
		
		.header {
			height: 60rpx;
			padding: @padding-xs 0;
			box-sizing: border-box;
			.flex-c-aic();
			position: relative;
			
			&::after {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background-color: @border-color;
				content: '';
			}
			
			.header-item {
				padding: 0 @padding-xs;
				height: 100%;
				box-sizing: border-box;
				.flex-c-aic-jcc();
				color: @text-primary-color;
				font-size: @font-size-base;
			}
		}
		
		.cotent {
			flex: 1;
			.flex-c();
			overflow: hidden;
			
			.content-swiper {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				padding: @padding-xs / 2 0;
				
				.content-scroll {
					height: 100%;
					
					.content-item {
						padding: 0 @padding-xs;
						.flex-col-jcc();
						height: 80rpx;
						font-size: @font-size-base;
						box-sizing: border-box;
					}
					
					.active {
						color: #CC0000;
					}
					
					.inactive {
						color: @text-secondary-color;
					}
				}
			}
		}
	}
</style>
