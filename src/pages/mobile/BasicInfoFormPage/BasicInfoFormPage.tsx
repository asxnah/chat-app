import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form/Form';
import s from './styles.module.css';

import fetchedContacts from '../../../mockData/contacts.json';
import { Header } from '../../../components/Header/Header';

const BasicInfoFormPage = () => {
	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}

	const { id } = useParams<{ id?: string }>();
	const navigate = useNavigate();
	const isCreate = useMatch('/contacts/create');
	const isEdit = useMatch('/contact/edit/:id');
	const [emailValue, setEmail] = useState<string>('');
	const [nameValue, setName] = useState<string>('');
	const [buttonText, setButtonText] = useState<string>('');
	const [heading, setHeading] = useState<string>('');

	useEffect(() => {
		if (isEdit) {
			setHeading('Edit contact');
			setButtonText('Save');
			const contact = fetchedContacts.find((c) => c.id === id) as Contact;
			setEmail(contact?.email || '');
			setName(contact?.name || '');
		} else {
			setHeading('New contact');
			setButtonText('Create');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header
				heading={heading}
				onChevronClick={() =>
					navigate(isCreate ? '/contacts' : `/contact/${id}`)
				}
			/>
			<main className={s.main}>
				<Form
					buttonText={buttonText}
					nameValue={nameValue}
					emailValue={emailValue}
					onNameChange={(e) => setName(e.target.value)}
					onEmailChange={(e) => setEmail(e.target.value)}
					onSubmit={() => alert('Submitted')}
				/>
			</main>
		</>
	);
};

export default BasicInfoFormPage;
