<template>
	<view class="p-1">
		<!-- 搜索框 -->
		<zxnav @send="value"></zxnav>
		<!-- 列表滑块 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:'+scrollH+'px;margin-top:'+navHeight+'px'" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsitems" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore">
					<!-- 轮播图组件 -->
					<swipper-image  :resdata="picture_list"></swipper-image>
					<!-- 首页排序 -->
					<view class="row j-center p-2  bg-white border-bottom" style="height: 80rpx;background-color: #f7f7f7;z-index: 999;position: sticky;top: 0;">
						<block v-for="(item,index) in indexnavs" :key="index">
							<view class="span-4 d-flex flex-column j-center a-center " @click="changeTab(index)" :class="tabIndex===index?'main-text-color font-weight':'text-light-muted'">
								<text class="font">{{item.text}}</text>
							</view>
						</block>
						
					</view>
					<!-- 公共列表样式 750 - 5 =745  745/2=372.5 -->
					<view class="row j-sb mt-2">
						<block  v-for="(item2,index2) in item.list" :key="index2">
							<commonList :item="item2" :index="index2"></commonList>
						</block>
					</view>
					<divider />
	
					<!-- 上拉加载更多 -->
					<view class="d-flex a-center j-center text-light-muted font-md py-3">
						{{item.loadText}}
					</view>
				</scroll-view>
	
			</swiper-item>
		</swiper>
		
	</view>
	
</template>
	
<script>
	let demoTabbar=[
		{
			text:"默认"
		},{
			text:"新品"
		},{
			text:"库存"
		},{
			text:"价格降序"
		},{
			text:"价格升序"
		}
	];
	import swipperImage from '@/components/index/swipper-image.vue';
	import commonList from '@/components/common/common-list.vue';
	import zxnav from '@/components/zxnav/zxnav.vue';
	import {systemInfo} from '@/mixin.js';
	export default {
		components:{
			swipperImage,
			commonList,
			zxnav
		},
		mixins:[systemInfo],
		data() {
			return {
				// 记录顶部选项卡当前选中
				tabIndex:0,
				scrollH:500,
				swippers:[],
				indexnavs:[],
				commonList:[],
				navHeight:this.navHeight,
				newsitems:[
					{
						text:"默认",
						list:[]
					},{
						text:"新品",
							
						list:[]
					},{
						text:"库存",
						list:[]
					},{
						text:"价格升序",
						list:[]
					},{
						text:"价格降序",
						list:[]
					}
				],
				picture_list:[
					{
						src:"../../static/images/coffee1.png"
					},{
						src:"../../static/images/coffee2.png"
					},{
						src:"../../static/images/coffee3.png"
					}
				]
			}
		},
		created() {
			// 获取可视区域高度
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH=res.windowHeight-uni.upx2px(82)
				}
			})
			this.__init()
		},
		onLoad() {
			this.getSystemInfo()
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search',
			});
		},
		methods: {
			changeTab(index){
				if(this.tabIndex===index){
					return;
				}else{
					this.tabIndex=index
					this.addData()
				}
			},
			// 监听滑动
			onChangeTab(e){
				this.changeTab(e.detail.current)
			},
			// 加载数据
			addData(){
				let index=this.tabIndex
				this.__init()
				console.log('请求数据库获取对应选项卡数据');
			},
			// 获取首页数据
			async __init () {
				// 根据顶部选项卡生成页面
				// let arr=[]
				// for(var i=0;i<this.indexnavs.length;i++){
				// 	let obj={
				// 		list:[],
				// 		loadText:"上拉加载更多"
				// 	}
				// 	arr.push(obj)
				// }
				// this.newsitems=arr
				
				let [error,result]= await uni.request({
					url:'http://localhost:8080/coffee/abbreviation',
					method:'GET',
					data:{
						pageSize:10,
						sort:this.tabIndex,
						pageNumber:1
					}
				})
				if(error){
					return uni.showToast({
						title: error.errMsg,
						icon:'none'
					})
				}
				// 失败
				if(result.statusCode!==200){
					return console.log(result.data.msg);
				}
				// 成功
				// console.log(result.data.data.list[1]);
				let data_list=result.data.data.list
				this.newsitems[this.tabIndex].list=data_list
				console.log(data_list);
				this.indexnavs=demoTabbar
			},
			loadmore(){
				let index=this.tabIndex
				let item=this.newsitems[index]
				// 是否处于可加载
				if(item.loadText!=='上拉加载更多'){
					return;
				}
				// 模拟加载
				item.loadText='加载中...'
				setTimeout(()=>{
					item.list=[...item.list,...demo2]
					// 回到重新加载状态
					item.loadText='上拉加载更多'
				},1000)
			
			}
		}
	}
</script>

<style>
	.sticky-top{
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1;
	}
	page{
		background-color: #f5f5f5
	}
</style>
