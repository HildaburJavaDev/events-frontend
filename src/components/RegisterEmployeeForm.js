import React, { useState, useEffect } from 'react';
import { registration } from '../http/userAPI';
import { getAllRoles } from '../http/userAPI';

const RegisterEmployeeForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [patronimyc, setPatronimyc] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role_id, setRoleId] = useState('');
	const [error, setError] = useState('');
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await getAllRoles(); // Вот здесь
				console.log(response)
				setRoles(response.data);
			} catch (error) {
				console.error('Failed to fetch roles:', error);
			}
		};
		fetchRoles();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateInput()) return;

		try {
			await registration({
				firstName,
				lastName,
				patronimyc,
				phoneNumber,
				email,
				password,
				role_id
			});

			alert('Зарегистрирован');
			setFirstName('');
			setLastName('');
			setPatronimyc('');
			setPhoneNumber('');
			setEmail('');
			setPassword('');
			setRoleId('');
		} catch (error) {
			console.error('Failed to register user:', error);
		}
	};

	const validateInput = () => {
		let isValid = true;
		let errorMessage = '';

		if (!firstName || !lastName || !email || !password || !role_id) {
			isValid = false;
			errorMessage = 'All fields are required!';
		} else if (!validateEmail(email)) {
			isValid = false;
			errorMessage = 'Invalid email address!';
		}

		if (!isValid) {
			setError(errorMessage);
		}

		return isValid;
	};

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="firstName">Имя:</label>
				<input
					className="form-control"
					type="text"
					id="firstName"
					placeholder="Введите имя"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Фамилия:</label>
				<input
					className="form-control"
					type="text"
					id="lastName"
					placeholder="Введите фамилию"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="patronimyc">Отчество:</label>
				<input
					className="form-control"
					type="text"
					id="patronimyc"
					placeholder="Введите отчество"
					value={patronimyc}
					onChange={(e) => setPatronimyc(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="phoneNumber">Номер телефона:</label>
				<input
					className="form-control"
					type="text"
					id="phoneNumber"
					placeholder="Введите номер телефона"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email:</label>
				<input
					className={`form-control ${error && 'is-invalid'}`}
					type="email"
					id="email"
					placeholder="Введите email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="password">Password:</label>
				<input
					className="form-control"
					type="password"
					id="password"
					placeholder="Введите пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="role_id">Role:</label>
				<select
					className="form-control"
					id="role_id"
					value={role_id}
					onChange={(e) => setRoleId(e.target.value)}
				>
					<option value="">Выбрать роль</option>
					{roles.map((role) => (
						<option key={role.id} value={role.id}>
							{role.role_name}
						</option>
					))}
				</select>
			</div>

			<button className="btn btn-primary" type="submit" onClick={handleSubmit}>
				Зарегистрировать
			</button>
		</div>
	);
};

export default RegisterEmployeeForm;
