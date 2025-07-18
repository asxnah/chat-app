import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../uikit/UserInfo/UserInfo';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import styles from './styles.module.css';

const Contacts = () => {
	const navigate = useNavigate();

	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifications: boolean;
	}

	const [notifications, setNotifications] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [searchValue, setSearchValue] = useState<string>('');
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [selectedUser, setSelectedUser] = useState<Contact>({
		id: '',
		name: '',
		avatar: '',
		email: '',
		notifications: false,
	});

	useEffect(() => {
		const fetchedContacts = [
			{
				id: '32740yrtouhgjfkds',
				name: 'Cutie𖦹𖦹',
				avatar:
					'https://i.pinimg.com/1200x/ae/6c/74/ae6c748ab01cd6696ef77c6ba27ed6f2.jpg',
				email: 'email@example.com',
				notifications: true,
			},
			{
				id: 'kfjdwiuehdskj34567',
				name: 'Bunny 🐇',
				avatar:
					'https://i.pinimg.com/736x/8d/94/44/8d9444611dab6bdec74ea00df0ec59a2.jpg',
				email: 'email@example.com',
				notifications: true,
			},
		];
		setContacts(fetchedContacts);
		setNotifications(fetchedContacts[0].notifications);
		setSelectedUser(fetchedContacts[0]);
	}, []);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const setNotificationsGlobally = (id: string) => {
		setNotifications(!notifications);

		const updatedContacts = contacts.map((contact) =>
			contact.id === id
				? { ...contact, notifications: !notifications }
				: contact
		);
		setContacts(updatedContacts);
	};

	const addContact = () => {
		// width > 880 -> popup
		// width < 880 -> navigate contacts/add
		return;
	};

	const deleteContact = (id: string) => {
		return id;
	};

	return (
		<main className={styles.contacts}>
			<section className={styles.contactsList}>
				<div className={styles.searchbar}>
					<Button onClick={addContact} content={<AddContactIcon />} />
					<Input
						placeholder="Search contacts"
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</div>
				{contacts.map((contact) => {
					return (
						<UserInfo
							key={contact.id}
							type="contact"
							id={contact.id}
							name={contact.name}
							avatar={contact.avatar}
							selected={
								selectedUser.id === contact.id && width > 880 ? true : false
							}
							onClick={() => setSelectedUser(contact)}
						/>
					);
				})}
			</section>
			<section className={styles.profileTab}>
				<UserInfo
					type="profile"
					name={selectedUser.name}
					avatar={selectedUser.avatar}
					content={selectedUser.email}
					onClick={() => navigate('/contacts')}
				/>
				<ul>
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
							onToggle={() => setNotificationsGlobally(selectedUser.id)}
						/>
					</li>
				</ul>
				<button onClick={() => deleteContact(selectedUser.id)}>
					Delete contact
				</button>
			</section>
		</main>
	);
};

export default Contacts;
