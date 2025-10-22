import type { ReactNode, MouseEvent } from 'react';
import s from './styles.module.css';

type ButtonProps = {
	type?: 'button' | 'submit';
	content: string | ReactNode;
	disabled?: boolean;
	onClick?: (e: MouseEvent) => void;
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
			className={s.button}
			disabled={disabled}
			onClick={onClick}
		>
			{content}
		</button>
	);
};
