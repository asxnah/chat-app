import { useLocation, useNavigate } from 'react-router-dom';
import { ChatsIcon } from '../../assets/icons/ChatsIcon';
import { ContactsIcon } from '../../assets/icons/ContactsIcon';
import { SettingsIcon } from '../../assets/icons/SettingsIcon';
import styles from './styles.module.css';

export const TabBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log(location.pathname);

	return (
		<aside className={styles.tabbar}>
			<ul>
				<li
					className={`${styles.tab} ${
						location.pathname === '/chats' && styles.active
					}`}
				>
					<button onClick={() => navigate('/chats')}>
						<ChatsIcon />
						<span>Chats</span>
					</button>
				</li>
				<li
					className={`${styles.tab} ${
						location.pathname === '/contacts' && styles.active
					}`}
				>
					<button onClick={() => navigate('/contacts')}>
						<ContactsIcon />
						<span>Contacts</span>
					</button>
				</li>
			</ul>
			<div
				className={`${styles.tab} ${
					location.pathname === '/settings' && styles.active
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
