import { useLocation, useNavigate } from 'react-router-dom';
import { ChatsIcon } from '../../assets/icons/ChatsIcon';
import { ContactsIcon } from '../../assets/icons/ContactsIcon';
import { SettingsIcon } from '../../assets/icons/SettingsIcon';
import s from './styles.module.css';

export const TabBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<aside className={s.tabbar}>
			<ul>
				<li
					className={`${s.tab} ${
						location.pathname === '/chats' && s.active
					}`}
				>
					<button onClick={() => navigate('/chats')}>
						<ChatsIcon />
						<span>Chats</span>
					</button>
				</li>
				<li
					className={`${s.tab} ${
						location.pathname === '/contacts' && s.active
					}`}
				>
					<button onClick={() => navigate('/contacts')}>
						<ContactsIcon />
						<span>Contacts</span>
					</button>
				</li>
			</ul>
			<div
				className={`${s.tab} ${
					location.pathname === '/settings' && s.active
				}`}
			>
				<button onClick={() => navigate('/settings')}>
					<SettingsIcon />
					<span>Settings</span>
				</button>
			</div>
		</aside>
	);
};
