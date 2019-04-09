import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
	type: types.RECEIVE_PRODUCTS,
	products
})

// 请求商品列表
export const getAllProducts = () => dispatch => {
	// 请求本地JSON数据
	//	shop.getLocalProducts(products => {
	//		dispatch(receiveProducts(products))
	//	})
	// 请求网络JSON数据
	shop.getNetProducts().then((data) => {
		dispatch(receiveProducts(data))
	}).catch((e) => {
		console.log("请求数据发生错误");
	});
}

const addToCartUnsafe = productId => ({
	type: types.ADD_TO_CART,
	productId
})

// 添加商品至购物车
export const addToCart = productId => (dispatch, getState) => {
	if(getState().products.byId[productId].inventory > 0) {
		dispatch(addToCartUnsafe(productId))
	}
}

// 付款
export const checkout = products => (dispatch, getState) => {
	const {
		cart
	} = getState()
	// 付款请求
	shop.buyProducts(products, () => {
		dispatch({
			type: types.CHECKOUT_SUCCESS,
			cart
		})
		// dispatch({ type: types.CHECKOUT_FAILURE, cart })
	})
}