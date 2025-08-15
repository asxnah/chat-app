import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserInfo } from '../../../components/UserInfo/UserInfo';
import { Toggler } from '../../../uikit/Toggler/Toggler';
import s from './styles.module.css';

import fetchedContacts from '../../../mockData/contacts.json';

const Contact = () => {
	const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

	const [checked, setChecked] = useState<boolean>(true);
	const [contact, setContact] = useState<{
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}>({
		id: '',
		name: '',
		avatar: '',
		email: '',
		notifs: false,
	});

	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}

	const deleteContact = () => {
		return;
	};

	useEffect(() => {
		setContact(fetchedContacts.find((c) => c.id === id) as Contact);
	}, [id]);

	return (
		<main className={s.main}>
			<UserInfo
				type="profile"
				avatar={contact?.avatar}
				name={contact?.name}
				content={contact?.email}
				onClick={() => navigate(`/contact/edit/${contact?.id}`)}
			/>
			<UserInfo type="link" name="Write a message" />
			<Toggler
				content="Notifications"
				checked={checked}
				onToggle={() => setChecked(!checked)}
			/>
			<button className={s.deleteButton} onClick={deleteContact}>
				Delete contact
			</button>
		</main>
	);
};

export default Contact;
