<template>
	<view>
		<u-search placeholder="输入您想要的咖啡" :clearabled="true" v-model="searchText" @search="searchEvent" @custom="searchEvent"></u-search>
		<template v-if="searchList.length===0">
			<!-- 搜索历史 -->
			<uni-card title="搜索历史">
				<!-- 搜索历史列表 -->
				<view class="flex flex-wrap" v-if="list.length!==0">
					<view @click="clickSearchHistory(item)" hover-class="bg-light"
						class="px-2 py-1 border d-inline-block m-1" v-for="(item,index) in list.slice(0,20)" :key="index" style="border-radius: 20upx;">{{item}}</view>
				</view>
				<view v-if="list.length===0">
					还没有搜索历史~
				</view>
			</uni-card>
			
			<uni-card title="热门搜索">
				<!-- 多色按钮 -->
				<view class="px-1 mb-2">
				<colorTag v-for="(item,index) in hot" :key="index" :item="item"></colorTag>
				</view>
			</uni-card>
		</template>
		<!-- 搜索结果列表 -->
		<template v-else>
			<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
				<template v-if="searchList.length>0">
					<block v-for="(item,index) in searchList" :key="index">
						<searchList :item="item" :index="index"></searchList>
					</block>
				</template>
				<template v-else>
					<zhy-nothing></zhy-nothing>
				</template>
			</scroll-view>
		</template>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue';
	import colorTag from '@/components/search/color-tag.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import searchList from '@/components/search-list/search-list.vue';
	export default {
		components:{
			card,colorTag,uniListItem,searchList
		},
		data() {
			return {
				searchText:"",
				scrollH:600,
				// 搜索历史
				list:[],
				// 搜索结果
				searchList:[],
				hot:[
					{name:'好喝的咖啡'},
					{name:'提神的咖啡'},
					{name:'减肥的咖啡'},
					{name:'现磨咖啡'},
					{name:'咖啡豆'}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index===0){
				uni.navigateTo({
					url:'/pages/search-list/search-list'
				})
			}
		},
		
		methods: {
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()
				// 加入搜索历史
				let index = this.list.findIndex(v => v === this.searchText)
				if (index !== -1) {
					if (index !== 0) {
						this.list.unshift(this.list.splice(index, 1)[0]);
					}
				} else {
					this.list.unshift(this.searchText)
				}
				// 保存到本地存储
				if(this.list.length!==0){
					uni.setStorageSync('historySearchText', JSON.stringify(this.list))
				}
				// 处于加载中状态
				uni.showLoading({
					title: '加载中',
					mask: false
				});
				setTimeout(()=>{
					// 请求搜索
					uni.request({
						url:'http://localhost:8080/coffee/abbreviation',
						method:'GET',
						data:{
							pageSize:10,
							sort:0,
							pageNumber:1,
							search:this.searchText
						},
						success: res => {
							this.searchList=res.data.data.list
							console.log(this.searchText);
							console.log(this.searchList);
							if(this.searchList.length===0){
								uni.showModal({
									title:'提示',
									content:'没有这种咖啡哦~',
									showCancel:false
								})
							}
						},
						fail: res => {
							uni.showToast({
								title: '获取搜索结果失败',
								icon: 'none'
							});
						}
					})
					uni.hideLoading()
				},1000)
			}
		}
	}
</script>

<style>

</style>
