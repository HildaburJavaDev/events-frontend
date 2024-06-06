import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { updateMembers } from '../http/eventsAPI';
import { useParams } from 'react-router-dom';

const EventMembers = ({ members }) => {
	const { eventId } = useParams();

	useEffect(() => {
		console.log('Members were updated:', members);
	}, [members]);

	const handleConfirm = async (member) => {
		try {
			const response = await updateMembers(member.id, eventId, "true");
			member.isConfirmed = true;
			alert(response.data.message);
		} catch (error) {
			console.error('Ошибка подтверждения участника:', error);
		}
	};

	const handleCancel = async (member) => {
		try {
			const response = await updateMembers(member.id, eventId, "false");
			member.isConfirmed = false;
			alert(response.data.message);
		} catch (error) {
			console.error('Ошибка отмены участника:', error);
		}
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="members table">
					<TableHead>
						<TableRow>
							<TableCell>Имя</TableCell>
							<TableCell>Фамилия</TableCell>
							<TableCell>Отчество</TableCell>
							<TableCell>Номер телефона</TableCell>
							<TableCell>Статус подтверждения</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{members.map((member) => (
							<TableRow key={member.id}>
								<TableCell>{member.firstname}</TableCell>
								<TableCell>{member.lastname}</TableCell>
								<TableCell>{member.patronimyc}</TableCell>
								<TableCell>{member.phoneNumber}</TableCell>
								<TableCell>{member.isConfirmed ? 'Подтверждено' : 'Не подтверждено'}</TableCell>
								<TableCell>
									{member.isConfirmed ? (
										<Button onClick={() => handleCancel(member)}>Отменить</Button>
									) : (
										<Button onClick={() => handleConfirm(member)}>Подтвердить</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default EventMembers;
