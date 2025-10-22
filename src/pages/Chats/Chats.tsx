/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { Input } from '../../uikit/Input/Input';
import s from './styles.module.css';

import fetchedChats from '../../mockData/chats.json';

const Chats = () => {
	interface Message {
		user: boolean;
		msg: string;
		time: string;
	}

	interface Chat {
		user_id: string;
		chat_data: Message[] | [];
	}

	const [searchValue, setSearchValue] = useState<string>('');
	const [chats, setChats] = useState<Chat[]>([]);
	const [chat, setChat] = useState<Chat>({
		user_id: '',
		chat_data: [],
	});
	const filteredChats = useMemo(() => {
		return;
	}, [searchValue, chats]);

	useEffect(() => {
		if (fetchedChats.length > 0) {
			// setChats(fetchedChats);
			// setChat(fetchedChats[0]);
		}
	}, []);

	const search = (value: string) => {
		setSearchValue(value);
	};

	const chatAction = (id: string) => {
		const foundChat = chats.find((chat) => chat.user_id === id);

		if (!foundChat) return;
		setChat(foundChat);
	};

	const formatDateTime = (isoString: string): string => {
		const date = new Date(isoString);
		const now = new Date();

		const formatTime = (d: Date) => {
			const hours = d.getHours().toString().padStart(2, '0');
			const minutes = d.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		};

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
			return formatTime(date);
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

	const AddChat = () => {
		return;
	};

	return (
		<>
			<main className={s.main}>
				<section className={s.chats}>
					<Input
						name="search"
						placeholder="Search chats"
						value={searchValue}
						onChange={(e) => search(e.target.value)}
					/>
					<div className={s.noChats}>
						<p>
							You don’t have chats yet.&nbsp;{' '}
							<button className={s.noChats__button} onClick={AddChat}>
								Create first contact
							</button>
						</p>
					</div>
				</section>
				<section className={s.chat}></section>
			</main>
		</>
	);
};

export default Chats;
