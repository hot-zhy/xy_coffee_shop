<template>
	<view>

		<uniCard v-for="(list,list_index) in category" :key="list_index" :title="list.categoryName" extra="＞" @click="firstCategory(list.categoryId)">
			<view  class="flex flex-wrap w-100">
				<view v-for="(item,index) in list.children" :key="index" :item="item" class="px-2 py-1 border d-inline-block m-1 font-md" style="border-radius: 20upx;font-weight: 540;" hover-class="bg-light" @tap.stop="clicks(item.categoryId)">{{item.categoryName}}</view>
			</view>
		</uniCard>
	</view>
</template>

<script>
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue';
	import colorTag from '@/components/search/color-tag.vue';
	export default {
		components:{
			uniCard,colorTag
		},
		data() {
			return {
				category:[]
			}
		},
		onLoad() {
			// 获取分类
			this.__init()
		},
		methods: {
			async __init () {
				let [error,result]= await uni.request({
					url:'http://localhost:8080/category/tree',
					method:'GET'
				})
				if(error){
					return uni.showToast({
						title: error.errMsg,
						icon:'none'
					})
				}
				// 失败
				if(result.statusCode!==200){
					return console.log(result.data);
				}
				// 成功
				console.log(result.data.data.children);
				this.category=result.data.data.children
				console.log(this.category);
			},
			firstCategory(index){
				uni.navigateTo({
					url:'/pages/first-category/first-category?index='+index,
					animationType:'fade-in'
				})
			},
			clicks(index){
				console.log(index);
				uni.navigateTo({
					url:'/pages/second-category/second-category?index='+index,
					animationType:'fade-in'
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #f5f5f5;
}
</style>
