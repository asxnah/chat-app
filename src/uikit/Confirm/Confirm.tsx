import styles from './styles.module.css';

interface ConfirmProps {
	content: string;
	onConfirm: (e: React.MouseEvent) => void;
	onDecline: (e: React.MouseEvent) => void;
}

export const Confirm = ({ content, onConfirm, onDecline }: ConfirmProps) => {
	return (
		<div className={styles.confirm}>
			<p>{content}</p>
			<div>
				<button onClick={onConfirm}>Yes</button>
				<button onClick={onDecline}>No</button>
			</div>
		</div>
	);
};
