import { ChevronRight } from './ChevronRight';
import styles from './styles.module.css';

type UserInfoProps = {
	type: 'contact' | 'profile' | 'message' | 'link';
	id?: string;
	name: string;
	avatar?: string;
	content?: string;
	status?: 'Typing...' | 'New chat';
	date?: string;
	counter?: number;
	selected?: boolean;
	onClick?: (e: React.MouseEvent) => void;
};

export const UserInfo = ({
	type,
	id,
	name,
	avatar,
	content,
	status,
	date,
	counter,
	selected,
	onClick,
}: UserInfoProps) => {
	return (
		<article
			className={`${styles.userInfo} ${styles[type]} ${
				selected && styles.selected
			}`}
			onClick={onClick}
			tabIndex={0}
			id={id}
		>
			<div className={styles.left}>
				{avatar && <img src={avatar} alt="user avatar" />}
				<div className={styles.content}>
					<div className={styles.container}>
						<h4>{name}</h4>
						{type === 'message' && <small>{date}</small>}
					</div>
					<div className={styles.container}>
						{content && <p>{content}</p>}
						{status && <p className={styles.status}>{status}</p>}
						{counter && (
							<div className={styles.counter}>
								<span>{counter}</span>
							</div>
						)}
					</div>
				</div>
			</div>
			{(type === 'profile' || type === 'link') && <ChevronRight />}
		</article>
	);
};
