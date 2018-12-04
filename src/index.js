import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllProducts } from './actions'
import App from './containers/App'
//import { createLogger } from 'redux-logger'

// 自定义中间件
const myMiddleware = (store) => (next) => (action) => {
	console.log('进入自定义中间件');
	// 对action数据进行操作
	// some code.....
	next(action)
}
const middleware = [thunk, myMiddleware];
//if(process.env.NODE_ENV !== 'production') {
//	middleware.push(createLogger())
//}

const store = createStore(reducer, applyMiddleware(...middleware))
store.dispatch(getAllProducts())

render(
	<Provider store={store}>
    	<App />
  	</Provider>, document.getElementById('root')
)