import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { generateID } from '../../utils/generateID.ts';

import { user_session_id } from '../../../config.ts';

import type { Chat } from './types';
import type { User } from './types';

import { DotsIcon } from '../../assets/icons/DotsIcon';
import { Input } from '../../uikit/Input/Input';
import { Button } from '../../uikit/Button/Button';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { SendIcon } from '../../assets/icons/SendIcon';

import s from './styles.module.css';

const Chats = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const [hasBG, setHasBG] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat>({
    id: '',
    user_id: '',
    backgroundImage: '',
    chat_data: [],
  });

  const getUser = (id: string): User => {
    const user = users.find((user) => user.id === id);

    if (!user) {
      return {
        id: 'No data',
        name: 'No data',
        avatar: 'No data',
        email: 'No data',
        chats: [],
      };
    } else return user;
  };

  const filteredChats = useMemo(() => {
    if (!searchValue) return chats;

    return chats.filter((chat) => {
      const contactId = chat.chat_data.find(
        (msg) => msg.user_id !== user_session_id
      )?.id;

      const contact = contactId ? getUser(contactId) : null;

      return (
        contact?.name.toLowerCase().includes(searchValue.toLowerCase()) ?? false
      );
    });
  }, [searchValue, chats]);

  const search = (value: string) => {
    setSearchValue(value);
  };

  const sendMsg = async (e: FormEvent<HTMLFormElement>, chat: Chat) => {
    e.preventDefault();

    const newMsg = {
      id: `msg-${generateID()}`,
      user_id: user_session_id,
      msg: msg,
      time: new Date().toISOString(),
      read: false,
    };

    await axios.patch(`http://localhost:3000/chats/${chat.id}`, {
      chat_data: [...chat.chat_data, newMsg],
    });
    setCurrentChat((chat) => ({
      ...chat,
      chat_data: [...chat.chat_data, newMsg],
    }));

    try {
      const { data } = await axios.get('http://localhost:3000/chats');
      if (Array.isArray(data) && data.length) {
        setChats(data);
      }
    } catch (err) {
      console.error(err);
    }

    setMsg('');
  };

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
        const { data } = await axios.get('http://localhost:3000/users');
        if (Array.isArray(data) && data.length) {
          setUsers(data);
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
          {filteredChats.map((chat) => {
            const id = chat.chat_data.find(
              (msg) => msg.user_id !== user_session_id
            )!.user_id;
            const contact = getUser(id);
            return (
              <UserInfo
                key={chat.id}
                type='message'
                name={contact.name}
                avatar={contact.avatar}
                selected={chat.id === currentChat.id}
                counter={0}
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
              {currentChat.chat_data.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`${s.message} ${
                      message.user_id === user_session_id
                        ? s.message__outcoming
                        : s.message__incoming
                    }`}
                  >
                    <p>{message.msg}</p>
                    <span className={s.message__time}>
                      {formatTime(message.time)}
                    </span>
                  </div>
                );
              })}
            </div>
            <form
              className={s.chat__inputCon}
              onSubmit={(e) => sendMsg(e, currentChat)}
            >
              <Input
                name='msg'
                placeholder='Message'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button type='submit'>
                <SendIcon />
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Chats;
