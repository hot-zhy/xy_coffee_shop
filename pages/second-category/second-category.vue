<template>
	<view class="p-1">
		<!-- 公共列表样式 750 - 5 =745  745/2=372.5 -->
		<view class="row j-sb ">
			<block  v-for="(item,index) in arr" :key="index">
				<commonList :item="item" :index="index"></commonList>
			</block>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';
	import price from '@/components/common/price.vue';
	import commonList from '@/components/common/common-list.vue';
	export default {
		components:{
			uniLoadMore,
			price,
			commonList
		},
		data() {
			return {
				index:0,
				arr:[],
			}
		},
		onLoad(option){
			if(option){
				this.index=option.index
			}
			uni.request({
				url: 'http://172.30.241.118:8080/coffee/category/'+option.index,
				method: 'GET',
				data: {
					'id':option.second_index
				},
				success: res => {
					this.arr=res.data.data
					console.log(this.arr);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			// 模拟数据加载
			loadMore() {
				this.loadStatus = 'loading';
				this.page++
				this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
			},

		}
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
	}

</style>
