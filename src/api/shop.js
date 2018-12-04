// http://www.helloui.net/data/products.json
import _products from './products.json'
import axios from 'axios';

const TIMEOUT = 100

const _get = ({
	url,
	query
}) => {
	return axios({
		method: 'get',
		url,
		params: { ...query}
	}).then((res) => {
		if(res.status === 200) {
			return res.data
		}
		return Promise.reject(res);
	}, (err) => {
		return Promise.reject(err.message || err.data);
	});
};

export const getNetProducts = () => {
	const url = "/data/products.json"
	const query = {}
	return _get({
		url,
		query
	}).then((data) => Promise.resolve(data)).catch((e) => Promise.reject(e));
}

export default {
	getNetProducts: getNetProducts,
	getLocalProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
	buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}