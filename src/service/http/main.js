import axios from 'axios';
import router from '../../router';
import { message } from 'ant-design-vue';

const baseURL = process && process.env && process.env.NODE_ENV === 'production' ? '/api' : '/api';

const instance = axios.create({
	baseURL,
	responseEncoding: 'utf8',
	headers: {
		'Content-Type': 'multipart/form-data',
	}
});

// 拦截 request
instance.interceptors.request.use((request) => {
	console.log('request');
	console.log(request);
	const token = localStorage.getItem('token');
	if (token) {
		request.headers['adminToken'] = token;
	}
	return request;
}, error => Promise.reject(error));

// 拦截 response
instance.interceptors.response.use((response) => {
	// OPTIONS请求方法的用途：
	// 1. 用来获取服务器支持http的请求方式
	// 2. 用来检测服务器的性能
	if (response.config.method.toLowerCase() === 'options') return false;
	if (response.status !== 200) {
		return Promise.reject();
	}
	if (response.data.code === '401') {
		message.error('登录失效，请重新登录！');
		localStorage.removeItem('token');
		router.replace({
			path: '/login',
			query: { redirect: router.currentRoute.fullPath } // 登录成功后跳入浏览的当前页面
		})
	}
	return Promise.resolve(response.data);

}, (error) => {
	if (error.message.indexOf('code 404') > -1) {
		alert('数据不存在');
	} else if (error.message.indexOf('timeout of') > -1) {
		alert('请求超时了');
	} else {
		alert('系统繁忙，请稍候再试！');
	}
});

export default instance;
