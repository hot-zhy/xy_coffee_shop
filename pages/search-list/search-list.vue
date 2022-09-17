<template>
	<view>
		<block v-for="(item,index) in list" :key="index"> 
			<searchList :item="item" :index="index"></searchList>
		</block>
		
	</view>
</template>

<script>
	import searchList from '@/components/search-list/search-list.vue';
	export default {
		components:{
			searchList
		},
		data() {
			return {
				list:[
					{
						title:"好喝的咖啡",
						titlePic:"../../static/images/c1.jpg",
						desc:"好喝的咖啡",
						price:"100",
						stockLevel:11,
					},
					{
						title:"好喝的咖啡",
						titlePic:"../../static/images/c1.jpg",
						desc:"好喝的咖啡",
						price:"100",
						stockLevel:11,
					},
					{
						title:"好喝的咖啡",
						titlePic:"../../static/images/c1.jpg",
						desc:"好喝的咖啡",
						price:"100",
						stockLevel:11,
					},
					{
						title:"好喝的咖啡",
						titlePic:"../../static/images/c1.jpg",
						desc:"好喝的咖啡",
						price:"100",
						stockLevel:11,
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
