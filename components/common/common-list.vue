<template>
	<view style="width: 363upx;background-color: white;border-radius: 20upx;" class="mb-1" @click="openDetail(item.xyCoffeeId)">
		<!-- 图片懒加载 -->
		<zero-lazy-load :image="image" :imgMode='imgMode'>
		</zero-lazy-load>
		<view class="p-2 pt-1">
			<view class="font-md">{{item.xyCoffeeName}}</view>
			<text class="d-block font text-light-muted">{{item.xyCoffeeBrief}}</text>
			<view class="d-flex my-1">
				<price>{{item.xyCoffeePrice}}</price>
				<view class="font-sm text-light-muted flex-1" style="align-self: flex-end;text-align: right;">库存{{item.xyCoffeeStock}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue';
	import zeroLazyLoad from '@/uni_modules/zero-lazy-load/components/zero-lazy-load/zero-lazy-load.vue';
	export default{
		components:{
			price,
			zeroLazyLoad
		},
		props:{
			item:Object,
			index:Number
		},
		data(){
			return{
				// 图片裁剪模式
				imgMode: {
					type: String,
					default: 'widthFix'
				},
				image:'/static/images/c3.jpg'
			}
		},
		methods:{
			openDetail(index){
				uni.navigateTo({
					url: '/pages/detail/detail?index='+index,
					animationType:'fade-in'
				});
			}
		}
	}
</script>

<style>
</style>