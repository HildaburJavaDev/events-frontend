import axios from "axios";

const $host = axios.create({
	baseURL: process.env.APP_API_URL || 'http://localhost:8080'
})

const $authHost = axios.create({
	baseURL: process.env.APP_API_URL || 'http://localhost:8080'
})

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
	$host,
	$authHost
}