import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Chat } from './types';
import type { Contact } from './types';
import { DotsIcon } from '../../assets/icons/DotsIcon';
import { Input } from '../../uikit/Input/Input';
import { Button } from '../../uikit/Button/Button';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import s from './styles.module.css';
import { SendIcon } from '../../assets/icons/SendIcon';

const Chats = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const [hasBG, setHasBG] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat>({
    chat_id: '',
    user_id: '',
    backgroundImage: '',
    chat_data: [],
  });

  // const filteredChats = useMemo(() => {
  //   return;
  // }, [searchValue, chats]);

  const search = (value: string) => {
    setSearchValue(value);
  };

  // const chatAction = (id: string) => {
  //   const foundChat = chats.find((chat) => chat.user_id === id);

  //   if (!foundChat) return;
  //   setCurrentChat(foundChat);
  // };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatMessageTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();

    const formatDate = (d: Date) => {
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${month}/${day}`;
    };

    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (isToday) {
      return formatTime(isoString);
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate();

    if (isYesterday) {
      return 'Yesterday';
    }

    return formatDate(date);
  };

  const getUser = (id: string): Contact => {
    const user = contacts.find((contact) => contact.id === id);

    if (!user) {
      return {
        id: 'No data',
        name: 'No data',
        avatar: 'No data',
        email: 'No data',
        notifs: true,
      };
    } else return user;
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/chats');
        if (Array.isArray(data) && data.length) {
          setChats(data);
          setCurrentChat(data[0]);
        }
      } catch (err) {
        console.error(err);
      }

      try {
        const { data } = await axios.get('http://localhost:3000/contacts');
        if (Array.isArray(data) && data.length) {
          setContacts(data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentChat.backgroundImage === '') setHasBG(false);
    if (currentChat.backgroundImage !== '') setHasBG(true);
  }, [currentChat]);

  return (
    <>
      <main className={s.main}>
        <section className={s.chats}>
          {chats.length > 0 ? (
            <div className={s.searchbar}>
              <Input
                name='search'
                placeholder='Search chats'
                value={searchValue}
                onChange={(e) => search(e.target.value)}
              />
            </div>
          ) : (
            <div className={s.noChats}>
              <p>You don't have chats yet</p>
              <Button
                content='Send your first message'
                onClick={() => navigate('/contacts')}
              />
            </div>
          )}
          {chats.map((chat) => {
            const contact = getUser(chat.user_id);
            const counter = chat.chat_data.filter((msg) => !msg.read).length;
            return (
              <UserInfo
                key={chat.chat_id}
                type='message'
                name={contact.name}
                avatar={contact.avatar}
                selected={chat.chat_id === currentChat.chat_id}
                counter={counter === 0 ? null : counter}
                onClick={() => setCurrentChat(chat)}
                date={
                  chat.chat_data.at(-1)
                    ? formatMessageTime(chat.chat_data.at(-1)!.time)
                    : 'No data'
                }
                content={
                  chat.chat_data.length === 0
                    ? 'New chat'
                    : chat.chat_data.at(-1)?.msg
                }
              />
            );
          })}
        </section>
        <section className={`${s.chat} ${hasBG ? s.chat_hasBG : ''}`}>
          <button
            className={s.chat__settings}
            onClick={() => alert('Open chat menu')}
          >
            <DotsIcon />
          </button>
          <div className={s.chatContent}>
            <div
              className={s.messages}
              style={
                hasBG
                  ? {
                      backgroundImage: `url(${currentChat.backgroundImage})`,
                    }
                  : undefined
              }
            >
              {currentChat.chat_data.map((message) => (
                <div
                  className={`${s.message} ${
                    message.user_id === 0
                      ? s.message__outcoming
                      : s.message__incoming
                  }`}
                >
                  <p>{message.msg}</p>
                  <span className={s.message__time}>
                    {formatTime(message.time)}
                  </span>
                </div>
              ))}
            </div>
            <div className={s.chat__inputCon}>
              <Input
                name='msg'
                placeholder='Message'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button onClick={() => alert('Send message')}>
                <SendIcon />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Chats;
