import $H from '@/common/lib/request.js';
import $U from '@/common/lib/util.js';
export default{
	state:{
		// 选中列表（存放选中的id）
		selectedList:[],
		// popup显示
		popupShow:"none",
		popupIndex:-1,
		popupData:{},
		list:[
			{
				checked:false,
				xyCoffeeId:1,
				xyCoffeeName:"咖啡",
				xyCoffeePicturePath:'/static/images/c3.jpg',
				xyCoffeePrice:11,
				// 选中规格
				xyCoffeeSize:272,
				num:1,
				minnum:1,
				maxnum:19
			},
			{
				checked:false,
				xyCoffeeId:2,
				xyCoffeeName:"咖啡",
				xyCoffeePicturePath:'/static/images/c3.jpg',
				xyCoffeePrice:11,
				// 选中规格
				xyCoffeeSize:2,
				num:1,
				minnum:1,
				maxnum:19
			},
			{
				checked:false,
				xyCoffeeId:3,
				xyCoffeeName:"咖啡",
				xyCoffeePicturePath:'/static/images/c3.jpg',
				xyCoffeePrice:11,
				// 选中规格
				xyCoffeeSize:2,
				num:1,
				minnum:1,
				maxnum:19
			}
		]
	},
	getters:{
		// 判断是否全选
		checkedAll:(state)=>{
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice:(state)=>{
			var total = 0
			state.list.forEach(v=>{
				if (state.selectedList.indexOf(v.xyCoffeeId) > -1) {
					total += v.xyCoffeePrice*100*v.num
				}
			})
			return (total/100).toFixed(2)
		},
		// 禁用全选
		disableSelectAll:(state)=>{
			return state.list.length === 0
		},
		// 拿到当前需要修改属性的商品
		popupData:(state)=>{
			return state.popupIndex>-1? state.list[state.popupIndex]:{}
		},
		// 购物车商品数量
		cartCount:(state)=>{
			if(state.list.length <= 99){
				return state.list.length
			}
			return '99+'
		}
	},
	mutations:{
		// 初始化list
		initCartList(state,list){
			state.list = list
			$U.updateCartBadge(state.list.length)
		},
		// 选中/取消选中某个商品
		selectItem(state,index){
			let id = state.list[index].xyCoffeeId
			let i = state.selectedList.indexOf(id)
			// 之前是选中，取消选中 
			if (i > -1) {
				// 取消当前商品选中状态
				state.list[index].checked = false
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i,1)
			}
			// 选中
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		// 全选
		selectAll(state){
			state.selectedList = state.list.map(v=>{
				// 设置选中状态
				v.checked = true
				return v.xyCoffeeId
			})
		},
		// 取消全选
		unSelectAll(state){
			state.list.forEach(v=>{
				// 设置选中状态
				v.checked = false
			})
			state.selectedList = []
		},
		// 删除选中
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.xyCoffeeId) === -1
			})
		},
		// 初始化popupIndex
		initPopupIndex(state,index){
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods)
		},
		// 清空购物车
		clearCart(state){
			state.list = []
			state.selectedList = []
		}
	},
	actions:{
		// 更新购物车列表
		updateCartList({state,commit}){
			return new Promise((res,rej)=>{
				$H.get('/cart',{},{
					token:true,
					toast:false
				}).then(result=>{
					// 取消选中状态
					commit('unSelectAll')
					// 赋值
					commit('initCartList',result)
					res(result)
				}).catch(err=>{
					rej(err)
				})
			})
		},
		// 显示popup,传递索引，拿到当前索引对象
		doShowPopup({state,commit},{index,data}){
			commit('initPopupIndex',index)
			state.popupData = data
			state.popupData.item = state.list[index]
			console.log(state.popupData);
			state.popupShow = 'show'
		},
		// 隐藏popup
		doHidePopup({state,commit}){
			state.popupShow = 'hide'
			setTimeout(()=>{
				state.popupShow = 'none'
				commit('initPopupIndex',-1)
			},200)
		},
		doSelectAll({commit,getters}){
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		doDelGoods({commit,state}){
			if(state.selectedList.length === 0){
				return uni.showToast({
					title: '请选择要删除的商品',
					icon: 'none'
				});
			}
			uni.showModal({
				content: '是否删除选中',
				success: (res) => {
					if(res.confirm){
						commit('delGoods')
						uni.showToast({
							title:'删除成功'
						})
					}
				}
			});
		}
			
	}
}