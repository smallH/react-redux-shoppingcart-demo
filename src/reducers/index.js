import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'

export default combineReducers({
	cart,
	products
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

// 获取购物车商品总价格
export const getTotal = state => 
	getAddedIds(state).reduce((total, id) =>total + getProduct(state, id).price * getQuantity(state, id),0).toFixed(2)

// 获取购物车商品列表
export const getCartProducts = state =>
	getAddedIds(state).map(id => ({...getProduct(state, id),quantity: getQuantity(state, id)}))