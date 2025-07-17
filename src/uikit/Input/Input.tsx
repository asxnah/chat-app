import type { InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	value: string;
	type?: string;
}

export const Input = ({
	placeholder,
	value,
	type = 'text',
	...rest
}: InputProps) => {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			className={styles.input}
			{...rest}
			minLength={1}
			required
		/>
	);
};
