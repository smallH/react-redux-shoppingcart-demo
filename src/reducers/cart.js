import {ADD_TO_CART, CHECKOUT_SUCCESS, CHECKOUT_FAILURE} from '../constants/ActionTypes'

// 初始化数据
const initialState = {
	addedIds: [],
	quantityById: {}
}

// 购物车里商品ID数组
const addedIds = (state = initialState.addedIds, action) => {
	switch(action.type) {
		case ADD_TO_CART:
			if(state.indexOf(action.productId) !== -1) {
				return state
			}
			return [...state, action.productId]
		default:
			return state
	}
}

// 购物车里指定ID的商品的数量
const quantityById = (state = initialState.quantityById, action) => {
	switch(action.type) {
		case ADD_TO_CART:
			const {productId} = action
			return { ...state,[productId]: (state[productId] || 0) + 1}
		default:
			return state
	}
}

// 购物车数据集合
const cart = (state = initialState, action) => {
	switch(action.type) {
		case CHECKOUT_SUCCESS:
			// 清空购物车成功
			return initialState
		case CHECKOUT_FAILURE:
			// 清空购物车失败
			return action.cart
		default:
			// 购物车操作
			return {
				addedIds: addedIds(state.addedIds, action),
				quantityById: quantityById(state.quantityById, action)
			}
	}
}

//对外接口
export default cart
export const getAddedIds = cart => cart.addedIds
export const getQuantity = (cart, productId) => cart.quantityById[productId] || 0