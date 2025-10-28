import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import type { Contact, FormData } from './types';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import { Popup } from '../../components/Popup/Popup';
import { Form } from '../../components/Form/Form';
import s from './styles.module.css';

const Contacts = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isPopupOpened, setPopupOpened] = useState<boolean>(false);
  const [formHeading, setFormHeading] = useState<
    'New contact' | 'Edit contact'
  >('New contact');
  const [user, setUser] = useState<Contact>({
    id: '',
    name: '',
    avatar: '',
    email: '',
    notifs: true,
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const filteredContacts = useMemo(() => {
    return searchValue
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : contacts;
  }, [searchValue, contacts]);

  const setNotifs = (id: string) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, notifs: !contact.notifs } : contact
    );
    setContacts(updatedContacts);

    if (user.id === id) {
      const updatedUser = updatedContacts.find((contact) => contact.id === id);
      if (updatedUser) setUser(updatedUser);
    }
  };

  const selectContact = (id: string) => {
    const foundContact = contacts.find((contact) => contact.id === id);

    if (!foundContact) return;
    setUser(foundContact);
  };

  const openPopup = (goal: 'edit' | 'add') => {
    if (goal === 'add') {
      setFormHeading('New contact');
    }
    if (goal === 'edit') {
      setFormHeading('Edit contact');
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
    setPopupOpened(true);
  };

  const submitPopup = async () => {
    if (formHeading === 'New contact') {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        avatar:
          'https://i.pinimg.com/736x/6e/49/02/6e4902bf4606759e493020262a27aa68.jpg',
        email: formData.email,
        notifs: true,
      };

      try {
        await axios.post('http://localhost:3000/contacts', newContact);
        const updatedContacts = [...contacts, newContact];
        const sortedContacts = updatedContacts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setContacts(sortedContacts);
        setUser(newContact);
        setFormData({
          name: '',
          email: '',
        });
        setPopupOpened(false);
      } catch (err) {
        console.error(err);
      }
    }

    if (formHeading === 'Edit contact') {
      try {
        await axios.patch(`http://localhost:3000/contacts/${user.id}`, {
          name: formData.name,
          email: formData.email,
        });

        const updatedContacts = contacts.map((contact) =>
          contact.id === user.id
            ? { ...contact, name: formData.name, email: formData.email }
            : contact
        );
        const sortedContacts = updatedContacts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setContacts(sortedContacts);

        const updatedUser = sortedContacts.find(
          (contact) => contact.id === user.id
        );
        if (updatedUser) setUser(updatedUser);

        setFormData({
          name: '',
          email: '',
        });
        setPopupOpened(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);

      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      const sortedContacts = updatedContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setContacts(sortedContacts);

      if (sortedContacts.length > 0) {
        setUser(sortedContacts[0]);
      } else {
        setUser({
          id: '',
          name: '',
          avatar: '',
          email: '',
          notifs: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/contacts');
        if (Array.isArray(data) && data.length) {
          const sortedContacts = data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setContacts(sortedContacts);
          setUser(sortedContacts[0]);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <main className={s.main}>
        {isPopupOpened && (
          <Popup heading={formHeading} onClose={() => setPopupOpened(false)}>
            <Form
              buttonText='Save'
              nameValue={formData.name}
              emailValue={formData.email}
              onNameChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              onEmailChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              onSubmit={submitPopup}
            />
          </Popup>
        )}
        <section className={s.contactsList}>
          <div className={s.searchbar}>
            <Button
              onClick={() => openPopup('add')}
              content={<AddContactIcon color='#fcfcfc' />}
            />
            <Input
              name='search'
              placeholder='Search contacts'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {contacts.length > 0 ? (
            filteredContacts.map((contact) => {
              return (
                <UserInfo
                  key={contact.id}
                  type='contact'
                  id={contact.id}
                  name={contact.name}
                  avatar={contact.avatar}
                  selected={user.id === contact.id}
                  onClick={() => selectContact(contact.id)}
                />
              );
            })
          ) : (
            <div className={s.noContacts}>
              <p>
                You don’t have contacts yet.&nbsp;{' '}
                <button
                  className={s.noContacts__button}
                  onClick={() => openPopup('add')}
                >
                  Create first contact
                </button>
              </p>
            </div>
          )}
        </section>
        <section className={s.profileTab}>
          {contacts.length > 0 ? (
            <>
              <UserInfo
                type='profile'
                name={user.name}
                avatar={user.avatar}
                content={user.email}
                onClick={() => openPopup('edit')}
              />
              <ul className={s.profileTab__list}>
                <li key='message'>
                  <UserInfo
                    type='link'
                    name='Write a message'
                    onClick={() => console.log('Write a message')}
                  />
                </li>
                <li key='notifs'>
                  <Toggler
                    content='Notifications'
                    checked={user.notifs}
                    onToggle={() => setNotifs(user.id)}
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
      </main>
    </>
  );
};

export default Contacts;
