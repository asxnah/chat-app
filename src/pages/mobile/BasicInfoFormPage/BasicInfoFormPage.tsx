import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Form } from '../../../components/Form/Form';
import s from './styles.module.css';

import fetchedContacts from '../../../mockData/contacts.json';

const BasicInfoFormPage = () => {
	interface Contact {
		id: string;
		name: string;
		avatar: string;
		email: string;
		notifs: boolean;
	}

	const { id } = useParams<{ id?: string }>();
	const isCreate = useMatch('/contacts/create');
	const isEdit = useMatch('/contact/edit/:id');
	const [emailValue, setEmail] = useState<string>('');
	const [nameValue, setName] = useState<string>('');
	let buttonText;

	if (isCreate) {
		buttonText = 'Create';
	} else {
		buttonText = 'Save';
	}

	useEffect(() => {
		if (isEdit) {
			const contact = fetchedContacts.find((c) => c.id === id) as Contact;
			setEmail(contact?.email || '');
			setName(contact?.name || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
	);
};

export default BasicInfoFormPage;
