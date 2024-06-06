import axios from './axiosConfig';

export const getAll = async () => {
	return await axios.get('/api/events/')
}

export const getOne = async (eventId) => {
	return await axios.get(`/api/events/${eventId}`)
}

export const updateEvent = async (id, title, description, date, address, registrationIsOpen) => {
	return await axios.patch('/api/events/', { id, title, description, address, date, registrationIsOpen })
}

export const registerOnEvent = async (userId, eventId) => {
	return await axios.post('/api/events/reg', { eventId })
}

export const updateMembers = async (userId, eventId, status) => {
	return await axios.patch(`/api/events/${eventId}/`, { user_id: userId, status })
}

export const getMembersForEvent = async (eventId) => {
	return await axios.get(`/api/events/${eventId}/members`)
}

export const updateRegister = async (id, registrationIsOpen) => {
	return await axios.patch('/api/events/changeregister', { id, registrationIsOpen })
}

export const createEvent = async (title, description, date, address,) => {
	return await axios.post('/api/events/create', { title, description, date, address })
}

export const getStatsByEvent = async (id) => {
	return await axios.post('/api/events/getstats', { id })
}