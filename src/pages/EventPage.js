import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import { getAll } from '../http/eventsAPI';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(1), // 1 spacing unit equals 8px by default, so this is 8px. For exactly 10px, use 1.25.
		padding: theme.spacing(2), // Optional: Adds padding around the content
	},
}));

const EventPage = () => {
	const [events, setEvents] = useState([]);
	const classes = useStyles();


	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = (await getAll()).data;
				console.log(data);
				setEvents(data);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div className={classes.root}>
			<EventList events={events} />
		</div>
	);
};

export default EventPage;
