import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
import axios from './axiosConfig';

export const registration = async (userData) => {
	const token = localStorage.getItem('token');
	console.log(userData)
	await $host.post('/api/user/signup/employee', {
		firstname: userData.firstName,
		lastname: userData.lastName,
		patronimyc: userData.patronimyc,
		phoneNumber: userData.phoneNumber,
		email: userData.email,
		password: userData.password,
		role_id: userData.role_id
	}, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const getUserInfo = async () => {
	try {
		const token = localStorage.getItem('token');
		return await $host.get('/api/user/getbyid', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	} catch (error) {
		throw error;
	}
}

export const updateUserInfo = async (userInfo) => {
	try {
		const token = localStorage.getItem('token');
		return await $host.put('/api/user/update', userInfo, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (error) {
		throw error;
	}
};



export const login = async (phoneNumber, password) => {
	const { data } = await $host.post('api/user/signin', { phoneNumber, password })
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const getAllRoles = async () => {
	try {
		const token = localStorage.getItem('token');
		const response = await $host.get('/api/user/employeeroles', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(response)
		return response;
	} catch (error) {
		throw error;
	}
};

export const getAllUsersByRole = async (role, role2) => {
	try {
		const token = localStorage.getItem('token');
		const response = await $host.get(`/api/user/getusersbyrole?role=${role}&role=${role2}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}


export const getUsersForConfirmation = async () => {
	try {
		const response = await axios.get('/api/user/signup/confirm');
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const confirmRegistration = async (userId) => {
	try {
		await axios.post('/api/user/signup/confirm', { userId });
	} catch (error) {
		throw error;
	}
}

export const registerChild = async (firstname, lastname, patronimyc) => {
	try {
		await axios.post('/api/user/addchild', { firstname, lastname, patronimyc })
	} catch (error) {
		throw error;
	}
}

export const getChildsList = async () => {
	try {
		return await axios.get('/api/user/getchilds')
	} catch (error) {
		throw error;
	}
}



export default getAllRoles;
