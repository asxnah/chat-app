import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchedContacts } from '../../mockData/contacts';
import { UserInfo } from '../../uikit/UserInfo/UserInfo';
import { Header } from '../../components/Header/Header';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import styles from './styles.module.css';

const useWindowWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return width;
};

const Contacts = () => {
	const navigate = useNavigate();

	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}

	const [tab, setTab] = useState<'contacts' | 'contact'>('contacts');
	const [searchValue, setSearchValue] = useState<string>('');
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [user, setUser] = useState<Contact>({
		id: '',
		name: '',
		avatar: '',
		email: '',
		notifs: false,
	});
	const filteredContacts = useMemo(() => {
		return searchValue
			? contacts.filter((contact) =>
					contact.name.toLowerCase().includes(searchValue.toLowerCase())
			  )
			: contacts;
	}, [searchValue, contacts]);
	const width = useWindowWidth();
	const showList = width < 880 && tab === 'contacts';
	const showProfile = width < 880 && tab === 'contact';

	useEffect(() => {
		if (fetchedContacts.length > 0) {
			setContacts(fetchedContacts);
			setUser(fetchedContacts[0]);
		}
	}, []);

	const search = (value: string) => {
		setSearchValue(value);
	};

	const setNotifsGlobally = (id: string) => {
		const updatedContacts = contacts.map((contact) =>
			contact.id === id ? { ...contact, notifs: !contact.notifs } : contact
		);
		setContacts(updatedContacts);

		if (user.id === id) {
			const updatedUser = updatedContacts.find((contact) => contact.id === id);
			if (updatedUser) setUser(updatedUser);
		}
	};

	const contactAction = (id: string) => {
		const foundContact = contacts.find((contact) => contact.id === id);

		if (!foundContact) return;
		setUser(foundContact);
		if (width < 880) setTab('contact');
	};

	const addContact = () => {
		if (width > 880) console.log('popup');
		if (width < 880) navigate('/contacts/add');
	};

	const deleteContact = (id: string) => {
		return id;
	};

	return (
		<>
			{width < 880 && tab === 'contacts' && (
				<Header
					heading="Contacts"
					extension={<AddContactIcon />}
					onChevronClick={() => navigate('/contacts')}
					onExtensionClick={() => navigate('/contacts')}
				/>
			)}
			{width < 880 && tab === 'contact' && (
				<Header heading="Profile" onChevronClick={() => setTab('contacts')} />
			)}
			<main className={styles.contacts}>
				{(showList || width > 880) && (
					<section className={styles.contactsList}>
						<div className={styles.searchbar}>
							<Button
								onClick={addContact}
								content={<AddContactIcon color="#fcfcfc" />}
							/>
							<Input
								placeholder="Search contacts"
								value={searchValue}
								onChange={(e) => search(e.target.value)}
							/>
						</div>
						{filteredContacts.map((contact) => {
							return (
								<UserInfo
									key={contact.id}
									type="contact"
									id={contact.id}
									name={contact.name}
									avatar={contact.avatar}
									selected={user.id === contact.id && width > 880}
									onClick={() => contactAction(contact.id)}
								/>
							);
						})}
					</section>
				)}
				{(showProfile || width > 880) && (
					<section className={styles.profileTab}>
						<UserInfo
							type="profile"
							name={user.name}
							avatar={user.avatar}
							content={user.email}
							onClick={() => console.log(`open edit contact popup`)}
						/>
						<ul>
							<li key="message">
								<UserInfo
									type="link"
									name="Write a message"
									onClick={() => console.log(`go to chat with this user`)}
								/>
							</li>
							<li key="notifs">
								<Toggler
									content="Notifications"
									checked={user.notifs}
									onToggle={() => setNotifsGlobally(user.id)}
								/>
							</li>
						</ul>
						<button onClick={() => deleteContact(user.id)}>
							Delete contact
						</button>
					</section>
				)}
			</main>
		</>
	);
};

export default Contacts;
