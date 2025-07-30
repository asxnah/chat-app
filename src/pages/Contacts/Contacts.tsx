import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchedContacts } from '../../mockData/contacts';
import { UserInfo } from '../../uikit/UserInfo/UserInfo';
import { Header } from '../../components/Header/Header';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import s from './styles.module.css';
import { Form } from '../../components/Form/Form';

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
	const [formHeading, setFormHeading] = useState<
		'New contact' | 'Edit contact'
	>('New contact');
	const [nameValue, setNameValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [isPopupOpened, setPopupOpened] = useState<boolean>(false);

	useEffect(() => {
		if (fetchedContacts.length > 0) {
			setContacts(fetchedContacts);
			setUser(fetchedContacts[0]);
			setNameValue(fetchedContacts[0].name);
			setEmailValue(fetchedContacts[0].email);
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

	const submitPopup = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formHeading === 'New contact') {
			const newContact: Contact = {
				id: Date.now().toString(), // placeholder ID (actually should be searched in DB)
				name: nameValue,
				avatar:
					'https://i.pinimg.com/736x/e3/e4/63/e3e463274111bdfa9bcc2bdad6d51afe.jpg', // placeholder avatar(actually should be searched in DB)
				email: emailValue,
				notifs: true,
			};
			setContacts([...contacts, newContact]);
			setUser(newContact);
			setNameValue(newContact.name);
			setEmailValue(newContact.email);
			setPopupOpened(false);
		}

		if (formHeading === 'Edit contact') {
			const updatedContacts = contacts.map((contact) =>
				contact.id === user.id
					? { ...contact, name: nameValue, email: emailValue }
					: contact
			);
			setContacts(updatedContacts);
			const updatedUser = updatedContacts.find(
				(contact) => contact.id === user.id
			);
			if (updatedUser) setUser(updatedUser);
			setPopupOpened(false);
		}
	};

	const addContact = () => {
		if (width > 880) {
			setFormHeading('New contact');
			setNameValue('');
			setEmailValue('');
			setPopupOpened(true);
		}
		if (width < 880) {
			navigate('/contacts/add');
		}
	};

	const editContact = () => {
		if (width > 880) {
			setFormHeading('Edit contact');
			setPopupOpened(true);
		}
		if (width < 880) {
			navigate('/contacts/edit');
		}
	};

	const deleteContact = (id: string) => {
		const updatedContacts = contacts.filter((contact) => contact.id !== id);
		setContacts(updatedContacts);
		if (updatedContacts.length > 0) {
			setUser(updatedContacts[0]);
			setNameValue(updatedContacts[0].name);
			setEmailValue(updatedContacts[0].email);
		}
	};

	return (
		<>
			{width < 880 && tab === 'contacts' && (
				<Header
					heading="Contacts"
					extension={<AddContactIcon />}
					onChevronClick={() => navigate('/chats')}
					onExtensionClick={() => addContact()}
				/>
			)}
			{width < 880 && tab === 'contact' && (
				<Header heading="Profile" onChevronClick={() => setTab('contacts')} />
			)}
			<main className={s.contacts}>
				{isPopupOpened && (
					<Form
						heading={formHeading}
						nameValue={nameValue}
						emailValue={emailValue}
						onNameChange={(e) => setNameValue(e.target.value)}
						onEmailChange={(e) => setEmailValue(e.target.value)}
						onSubmit={submitPopup}
						onClose={() => setPopupOpened(false)}
					/>
				)}
				{(showList || width > 880) && (
					<section className={s.contactsList}>
						<div className={s.searchbar}>
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
						{contacts.length > 0 ? (
							filteredContacts.map((contact) => {
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
							})
						) : (
							<div className={s.noContacts}>
								<p>
									You don’t have contacts yet.&nbsp;{' '}
									<button onClick={addContact}>Create first contact</button>
								</p>
							</div>
						)}
					</section>
				)}
				{(showProfile || width > 880) && (
					<section className={s.profileTab}>
						{contacts.length > 0 ? (
							<>
								<UserInfo
									type="profile"
									name={user.name}
									avatar={user.avatar}
									content={user.email}
									onClick={editContact}
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
							</>
						) : (
							<p className={s.noSelection}>
								Select a chat or a contact to start messaging
							</p>
						)}
					</section>
				)}
			</main>
		</>
	);
};

export default Contacts;
