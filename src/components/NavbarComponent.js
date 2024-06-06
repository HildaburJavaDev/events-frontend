import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../index';

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: '#34495e',
	},
	title: {
		flexGrow: 1,
		fontFamily: 'Arial, sans-serif',
		color: '#ecf0f1',
		textDecoration: 'none',
	},
	navLink: {
		marginLeft: theme.spacing(2),
		color: '#ecf0f1',
		textDecoration: 'none',
		fontSize: 16,
		'&:hover': {
			color: '#bdc3c7',
		},
		borderBottom: (props) => (props.isActive ? '2px solid #16a085' : 'none'),
	},
	button: {
		color: '#ecf0f1',
		'&:hover': {
			backgroundColor: '#2c3e50',
		},
	},
}));

const NavbarComponent = () => {
	const location = useLocation();
	const { user } = useContext(Context);
	const classes = useStyles();

	const isActive = (path) => location.pathname === path;

	return (
		<AppBar position="static" className={classes.appBar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title} component={Link} to="/">
					Мероприятия НЭМК
				</Typography>
				<Button
					className={classes.button}
					component={Link}
					to="/courses"
					style={{ borderBottom: isActive('/events') ? '2px solid #16a085' : 'none' }}
				>
					Мероприятия
				</Button>
				<Button
					className={classes.button}
					component={Link}
					to="/cabinet"
					style={{ borderBottom: isActive('/cabinet') ? '2px solid #16a085' : 'none' }}
				>
					Кабинет
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavbarComponent;
