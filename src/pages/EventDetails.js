import React, { useState, useEffect } from 'react';
import EventMembers from '../components/EventMembers';
import { useParams } from 'react-router-dom';
import { getMembersForEvent } from '../http/eventsAPI';

const EventDetails = () => {
	const [members, setMembers] = useState([]);
	const { eventId } = useParams();
	useEffect(() => {
		const fetchEventMembers = async () => {
			try {
				const response = await getMembersForEvent(eventId);
				setMembers(response.data);
				console.log(response.data);
			} catch (error) {
				console.error('Ошибка получения данных участников:', error);
			}
		};

		fetchEventMembers();
	}, [eventId]);

	return (
		<div>
			<h2 style={{ backgroundColor: '#d4af37', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '10px' }}>Участники мероприятия</h2>
			<EventMembers members={members} />
		</div>
	);
};

export default EventDetails;
