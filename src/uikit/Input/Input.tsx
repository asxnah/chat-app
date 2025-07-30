import type { InputHTMLAttributes } from 'react';
import s from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	value: string;
	type?: string;
	name?: string;
}

export const Input = ({
	placeholder,
	value,
	type = 'text',
	name = 'input',
	...rest
}: InputProps) => {
	return (
		<input
			name={name}
			type={type}
			value={value}
			placeholder={placeholder}
			className={s.input}
			{...rest}
			minLength={1}
			required
		/>
	);
};
