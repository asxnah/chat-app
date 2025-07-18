import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { UserInfo } from '../../uikit/UserInfo/UserInfo';
import styles from './styles.module.css';
import { Header } from '../../components/Header/Header';

const Contact = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifications: boolean;
	}

	const [notifications, setNotifications] = useState<boolean>(false);
	const [contact, setContact] = useState<Contact>({
		id: '',
		name: '',
		avatar: '',
		email: '',
		notifications: false,
	});

	useEffect(() => {
		console.log(params.get('id'));
		const fetchedContact = {
			id: '1',
			name: 'Cutie𖦹𖦹',
			avatar:
				'https://i.pinimg.com/1200x/ae/6c/74/ae6c748ab01cd6696ef77c6ba27ed6f2.jpg',
			email: 'email@example.com',
			notifications: true,
		};
		setContact(fetchedContact);
		setNotifications(fetchedContact.notifications);
	}, []);

	const setNotificationsGlobally = () => {
		setNotifications(!notifications);

		const updatedContact = { ...contact, notifications: !notifications };
		setContact(updatedContact);
	};

	const deleteContact = (id: string) => {
		navigate('/contacts');
		return id;
	};

	return (
		<>
			<Header heading="Profile" onChevronClick={() => navigate('/contacts')} />
			<main className={styles.profileTab}>
				<ul>
					<li>
						<UserInfo
							type="profile"
							name={contact.name}
							avatar={contact.avatar}
							content={contact.email}
							onClick={() => navigate('/contacts')}
						/>
					</li>
					<li>
						<UserInfo
							type="link"
							name="Write a message"
							onClick={() => navigate('/contacts')}
						/>
					</li>
					<li>
						<Toggler
							content="Notifications"
							checked={notifications}
							onToggle={setNotificationsGlobally}
						/>
					</li>
				</ul>
				<button onClick={() => deleteContact(contact.id)}>
					Delete contact
				</button>
			</main>
		</>
	);
};

export default Contact;
