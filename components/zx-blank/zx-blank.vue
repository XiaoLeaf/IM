<template>
	<view class="root" :style="{ height: info.height * 2 + 'rpx', 'background-color' : info.bgColor }"></view>
</template>

<script>
	export default {
		name:"zx-blank",
		
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
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.root {
		width: 100%;
	}
</style>
