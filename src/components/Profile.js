import React, { useEffect, useState } from 'react';
import { getUserInfo, updateUserInfo } from '../http/userAPI';
import './styles/Profile.css';

const Profile = () => {
	const [user, setUser] = useState(null);
	const [editedUser, setEditedUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getUserInfo();
				setUser(response.data);
				setEditedUser(response.data);
			} catch (error) {
				console.error('Ошибка при получении данных пользователя:', error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	const formatPhoneNumber = (phoneNumber) => {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
		if (match) {
			return '8 (' + match[2] + ') ' + match[3] + ' ' + match[4] + '-' + match[5];
		}
		return phoneNumber;
	};

	const formattedPhoneNumber = editedUser ? formatPhoneNumber(editedUser.phoneNumber) : '';

	const handleSaveChanges = async () => {
		try {
			await updateUserInfo(editedUser);
			setUser(editedUser);
			alert("Данные профиля успешно обновлены")
		} catch (error) {
			console.error('Ошибка при обновлении профиля:', error);
		}
	};

	return (
		<div className="profile-container">
			<h2>Профиль</h2>
			{editedUser && (
				<div className="profile-form">
					<div className="form-group">
						<label>Имя:</label>
						<input
							type="text"
							name="firstname"
							value={editedUser.firstname || ''}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Фамилия:</label>
						<input
							type="text"
							name="lastname"
							value={editedUser.lastname || ''}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Отчество:</label>
						<input
							type="text"
							name="patronimyc"
							value={editedUser.patronimyc || ''}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Email:</label>
						<input type="text" name="email" value={editedUser.email || ''} onChange={handleInputChange} />
					</div>
					<div className="form-group">
						<label>Номер телефона:</label>
						<input
							type="text"
							name="phoneNumber"
							value={formattedPhoneNumber}
							onChange={handleInputChange}
						/>
					</div>
					<button className="save-button" onClick={handleSaveChanges}>
						Сохранить изменения
					</button>
				</div>
			)}
		</div>
	);
};

export default Profile;
