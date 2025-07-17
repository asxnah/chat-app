import type { ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonProps = {
	type?: 'button' | 'submit';
	content: string | ReactNode;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent) => void;
};

export const Button = ({
	type = 'button',
	content,
	disabled,
	onClick,
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={styles.button}
			disabled={disabled}
			onClick={onClick}
		>
			{content}
		</button>
	);
};
