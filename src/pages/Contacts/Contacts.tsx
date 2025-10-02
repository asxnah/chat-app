import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import { Popup } from '../../components/Popup/Popup';
import { Form } from '../../components/Form/Form';
import { Header } from '../../components/Header/Header';
import s from './styles.module.css';

import fetchedContacts from '../../mockData/contacts.json';

const Contacts = () => {
	const navigate = useNavigate();

	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}

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
		if (width < 880) navigate(`/contact/${id}`);
	};

	const submitPopup = () => {
		if (formHeading === 'New contact') {
			const newContact: Contact = {
				id: Date.now().toString(), // placeholder => db search
				name: nameValue,
				avatar:
					'https://i.pinimg.com/736x/e3/e4/63/e3e463274111bdfa9bcc2bdad6d51afe.jpg', // placeholder => db search
				email: emailValue,
				notifs: true,
			};
			setContacts([...contacts, newContact]);
			setUser(newContact);
			setNameValue('');
			setEmailValue('');
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
		setFormHeading('New contact');
		setNameValue('');
		setEmailValue('');
		setPopupOpened(true);
	};

	const editContact = () => {
		if (width > 880) {
			setFormHeading('Edit contact');
			setNameValue(user.name);
			setEmailValue(user.email);
			setPopupOpened(true);
		}
		if (width < 880) {
			navigate(`/contact/edit/${user.id}`);
		}
	};

	const deleteContact = (id: string) => {
		const updatedContacts = contacts.filter((contact) => contact.id !== id);
		setContacts(updatedContacts);
		if (updatedContacts.length > 0) {
			setUser(updatedContacts[0]);
		}
	};

	return (
		<>
			{width < 880 && (
				<Header
					heading="Contacts"
					extension={<AddContactIcon />}
					onChevronClick={() => navigate('/chats')}
					onExtensionClick={() => navigate('/contacts/create')}
				/>
			)}
			<main className={s.main}>
				{isPopupOpened && (
					<Popup heading={formHeading} onClose={() => setPopupOpened(false)}>
						<Form
							buttonText="Save"
							nameValue={nameValue}
							emailValue={emailValue}
							onNameChange={(e) => setNameValue(e.target.value)}
							onEmailChange={(e) => setEmailValue(e.target.value)}
							onSubmit={submitPopup}
						/>
					</Popup>
				)}
				<section className={s.contactsList}>
					<div className={s.searchbar}>
						<Button
							onClick={addContact}
							content={<AddContactIcon color="#fcfcfc" />}
						/>
						<Input
							name="search"
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
								<button className={s.noContacts__button} onClick={addContact}>
									Create first contact
								</button>
							</p>
						</div>
					)}
				</section>
				{width > 880 && (
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
								<ul className={s.profileTab__list}>
									<li key="message">
										<UserInfo
											type="link"
											name="Write a message"
											onClick={() => console.log('Write a message')}
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
								<button
									className={s.profileTab__button}
									onClick={() => deleteContact(user.id)}
								>
									Delete contact
								</button>
							</>
						) : (
							<p className={s.profileTab__noSelection}>
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
