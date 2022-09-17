<template>
	<view class="">
		<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0" style="height: 100rpx;z-index: 999;">
			<view class="d-flex flex-1 flex-column a-center j-center line-h-md " hover-class="bg-light-secondary">
				<u-icon name="heart-fill"></u-icon>收藏
			</view>
			<view class="d-flex flex-column a-center j-center line-h-md flex-1" hover-class="bg-light-secondary" @tap="ToCart">
				<u-icon name="car-fill"></u-icon>购物车
			</view>
			<view class="my-1 d-flex a-center j-center font-md text-white line-h-md border-right" hover-class="main-bg-hover-color" style="flex: 2.5;border-top-left-radius: 50upx;border-bottom-left-radius: 50upx;background-color: darkgoldenrod;" @tap="$emit('show')">
				加入购物车
			</view>
			<view class="my-1 mr-1 d-flex a-center j-center font-md main-bg-color text-white line-h-md" hover-class="main-bg-hover-color" style="flex: 1.5;border-top-right-radius: 50upx;border-bottom-right-radius: 50upx;">
			   支付
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			ToCart(){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		}
	}
</script>

<style>
</style>