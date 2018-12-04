import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes'

// 库存商品对象，商品ID值为对象属性
const byId = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_PRODUCTS:
			// 初始化数据
			return {
				...state,
				...action.products.reduce((obj, product) => {
					obj[product.id] = product
					return obj
				}, {})
			}
		case ADD_TO_CART:
			//检测到ADD_TO_CART添加至购物车，则该商品库存数量减1,
			const {productId} = action
			if(productId) {
				const product = state[productId];
				const updateProduct = {...product,inventory: product.inventory - 1}
				return {...state, [productId]: updateProduct}
			}
			return state
		default:
			return state
	}
}

// 展示页的商品ID数组
const visibleIds = (state = [], action) => {
	switch(action.type) {
		case RECEIVE_PRODUCTS:
			return action.products.map(product => product.id)
		default:
			return state
	}
}

export default combineReducers({
	byId,
	visibleIds
})

export const getProduct = (state, id) =>
	state.byId[id]

export const getVisibleProducts = state =>
	state.visibleIds.map(id => getProduct(state, id))